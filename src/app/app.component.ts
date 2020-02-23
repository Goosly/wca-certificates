import { Component } from '@angular/core';
import { ApiService } from '../common/api';
import { PrintService } from '../common/print';
import { Event } from '@wca/helpers/lib/models/event';
import { Result } from '@wca/helpers/lib/models/result';
import { environment } from '../environments/environment';
import { ViewEncapsulation } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  state: 'PRINT' | 'EDIT' | 'REFRESHING' = 'PRINT';

  // Info about competitions managed by user
  competitionsToChooseFrom: Array<String> = null;
  competitionId: string;
  events: Event[];
  wcif: any;

  constructor (
          public apiService: ApiService,
          public printService: PrintService) {
      if (this.apiService.oauthToken) {
        this.handleGetCompetitions();
      }
  }

  handleLoginToWca() {
    this.apiService.logIn();
  }

  handleGetCompetitions() {
    this.apiService.getCompetitions().subscribe(comps => {
      if (comps.length === 1) {
        this.handleCompetitionSelected(comps[0]['id']);
      }
      this.competitionsToChooseFrom = comps.map(c => c['id']);
    });
  }

  handleCompetitionSelected(competitionId: string) {
    this.competitionId = competitionId;
    this.loadWcif(this.competitionId);
  }

  handleRefreshCompetition() {
    this.state = 'REFRESHING';
    this.loadWcif(this.competitionId);
  }

  private loadWcif(competitionId: string) {
    this.apiService.getWcif(this.competitionId).subscribe(wcif => {
      this.wcif = wcif;
      try {
        this.events = this.wcif["events"];
        this.events.forEach(function(e) {
          let resultsOfEvent = e.rounds[e.rounds.length - 1].results;
          resultsOfEvent.forEach(function(r) {
            let personOfResult = wcif.persons.filter(p => p.registrantId === r.personId)[0];
            r['countryIso2'] = personOfResult.countryIso2;
          });
          if (environment.testMode && e.id === '333fm')
            e["printCertificate"] = true;
        });
        this.state = 'PRINT';
      } catch (error) {
        console.error(error);
        this.wcif = null;
        this.competitionId = null;
      }
    });
  }

  printCertificates() {
    this.printService.printCertificates(this.wcif,
      Array.from(this.events.filter(e => e["printCertificate"]).map(e => e.id)));
    this.apiService.logUserClicksDownloadCertificates(this.wcif.id);
  }

  printEmptyCertificate() {
    this.printService.printEmptyCertificate(this.wcif);
  }

  getWarningIfAny(eventId: string): string {
    let event: Event = this.events.filter(e => e.id === eventId)[0];
    let results: Result[] = event.rounds[event.rounds.length - 1].results;
    results = this.filterResultsWithOnlyDNF(results);
    results = this.filterResultsByCountry(results);

    let podiumPlaces = this.getPodiumPlaces(results);
    this.calculateRankingAfterFiltering(podiumPlaces);
    event['podiumPlaces'] = podiumPlaces;

    switch(podiumPlaces.length) {
      case 0:
        return 'Not available yet';
      case 1:
        return 'Only 1 person on the podium!';
      case 2:
        return 'Only 2 persons on the podium!';
      case 3:
        return ''; // No warning
      default:
        return 'More than 3 persons on the podium!';
    }
  }

  private filterResultsWithOnlyDNF(results: Result[]): Result[] {
    return results.filter(r => r['best'] > 0);
  }

  private filterResultsByCountry(results: Result[]): Result[] {
    if (!! this.printService.countries && this.printService.countries.length > 0) {
      return results.filter(r => this.printService.countries.split(';').includes(r['countryIso2']));
    }
    return results;
  }

  private getPodiumPlaces(results: Result[]): Result[] {
    let podiumPlaces = results.slice(0, 3);
    if (podiumPlaces.length >= 3) {
      let i = 3;
      while(i < results.length && i < (podiumPlaces.length - 1)) {
        if (podiumPlaces[i - 1].ranking === results[i].ranking) {
          podiumPlaces.push(results[i]);
        }
        i++;
      }
    }
    return podiumPlaces;
  }

  private calculateRankingAfterFiltering(podiumPlaces: Result[]): void {
    podiumPlaces.forEach(function(p) {
      p['rankingAfterFiltering'] = podiumPlaces.filter(o => o.ranking < p.ranking).length + 1;
    });
  }

  printDisabled(): boolean {
    return this.events.filter(e => e["printCertificate"]).length === 0;
  }

  printParticipationCertificates() {
    this.printService.printParticipationCertificates(this.wcif);
    this.apiService.logUserClicksDownloadCertificates(this.wcif.id);
  }

}

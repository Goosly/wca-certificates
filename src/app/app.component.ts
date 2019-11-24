import { Component } from '@angular/core';
import { ApiService } from '../common/api';
import { PrintService } from '../common/print';
import { Event } from '@wca/helpers/lib/models/event';
import { Result } from '@wca/helpers/lib/models/result';
import { environment } from '../environments/environment';
declare var $ :any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
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
          if (environment.testMode && e.id === '666')
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
  }
  
  printEmptyCertificate() {
    this.printService.printEmptyCertificate(this.wcif);
  }
  
  getWarningIfAny(eventId: string): string {
    let event: Event = this.wcif.events.filter(e => e.id === eventId)[0];
    let results: Result[] = event.rounds[event.rounds.length - 1].results;
    let podiumPlaces = results.filter(r => r.ranking !== null && r.ranking <= 3).length;
    
    switch(podiumPlaces) {
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
  
  buttonDisabled(): boolean {
    return this.events.filter(e => e["printCertificate"]).length === 0;
  }

}

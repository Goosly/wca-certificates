import { Component } from '@angular/core';
import { ApiService } from '../common/api';
import { PrintService } from '../common/print';
import { Event } from '@wca/helpers/lib/models/event';
declare var $ :any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  // Info about competitions managed by user
  competitionsToChooseFrom: Array<String> = null;
  competitionId: string;
  events: Event[];
  wcif: any;
  
  constructor (
          public apiService: ApiService,
          public printService: PrintService,) {
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
    this.apiService.getWcif(this.competitionId).subscribe(wcif => {
      this.wcif = wcif;
      try {
        this.events = this.wcif["events"];
        this.events.forEach(function(e) {
          if (e.id === '666') // todo remove
            e["printCertificate"] = true;
        });
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
  
  buttonDisabled(): boolean {
    return this.events.filter(e => e["printCertificate"]).length === 0;
  }

}

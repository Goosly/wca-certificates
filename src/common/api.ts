import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {LogglyService} from '../loggly/loggly.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public oauthToken;
  private headerParams: HttpHeaders;
  private logglyService: LogglyService;

  private ONE_YEAR = 365;
  private FOUR_WEEKS = 28;

  constructor(private httpClient: HttpClient) {
    this.getToken();

    this.headerParams = new HttpHeaders();
    this.headerParams = this.headerParams.set('Authorization', `Bearer ${this.oauthToken}`);
    this.headerParams = this.headerParams.set('Content-Type', 'application/json');

    this.initLoggly();
  }

  private initLoggly() {
    this.logglyService = new LogglyService(this.httpClient);
    this.logglyService.push({
      logglyKey: '3c4e81e2-b2ae-40e3-88b5-ba8e8b810586',
      sendConsoleErrors: false,
      tag: 'wca-certificates'
    });
  }

  private getToken(): void {
    const hash = window.location.hash.slice(1, window.location.hash.length - 1);
    const hashParams = new URLSearchParams(hash);
    if (hashParams.has('access_token')) {
      this.oauthToken = hashParams.get('access_token');
    }
  }

  logIn(): void {
    window.location.href = `${environment.wcaUrl}/oauth/authorize?client_id=${environment.wcaAppId}`
        + `&redirect_uri=${environment.appUrl}&response_type=token&scope=manage_competitions`;
  }

  getCompetitions(): Observable<any> {
    let url = `${environment.wcaUrl}/api/v0/competitions?managed_by_me=true`;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (environment.testMode ? this.ONE_YEAR : this.FOUR_WEEKS));
    url += `&start=${startDate.toISOString()}`;
    return this.httpClient.get(url, {headers: this.headerParams});
  }

  getWcif(competitionId): Observable<any> {
    if (environment.testMode) {
      return this.httpClient.get(`https://www.worldcubeassociation.org/api/v0/competitions/IzmirOpen2020/wcif/public`,
        {headers: this.headerParams});
    }
    return this.httpClient.get(`${environment.wcaUrl}/api/v0/competitions/${competitionId}/wcif`,
      {headers: this.headerParams});
  }

  logUserClicksDownloadCertificates(competitionId: any) {
    this.logMessage(competitionId + ' - Certificates downloaded');
  }

  logUserClicksDownloadParticipationCertificates(competitionId: any) {
    this.logMessage(competitionId + ' - Participation certificates downloaded');
  }

  private logMessage(message: string) {
    if (! environment.testMode) {
      setTimeout(() => {
        try {
          this.logglyService.push(message);
        } catch (e) {
          console.error(e);
        }
      }, 0);
    }
  }

}

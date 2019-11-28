import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public oauthToken;
  private headerParams: HttpHeaders;

  private ONE_YEAR = 365;
  private FOUR_WEEKS = 28;

  constructor(private httpClient: HttpClient) {
    this.getToken();

    this.headerParams = new HttpHeaders();
    this.headerParams = this.headerParams.set('Authorization', `Bearer ${this.oauthToken}`);
    this.headerParams = this.headerParams.set('Content-Type', 'application/json');
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
    return this.httpClient.get(`${environment.wcaUrl}/api/v0/competitions/${competitionId}/wcif`,
      {headers: this.headerParams});
  }

}

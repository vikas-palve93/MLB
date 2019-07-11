import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MLBServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getScheduleMatchList(utcDate){
    return this.http.get(environment.BaseUrl+"mlb_schedule?schedule_date="+utcDate);
  }

  getLiveMatchDetails(matchId: string){
    return this.http.get(environment.BaseUrl+"mlb_live?match_id="+matchId);
  }
}

import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DataService } from "../../Services/data.service";
import { MLBServiceService } from '../../Services/mlbservice.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, OnDestroy  {

  matchId: string;
  liveScore:any;
  timer:any;

  constructor(
    private MLBService: MLBServiceService,
    private data: DataService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.getLiveMatchDetails();
  }

  /***************************************************************************************
   * This function is for cleartimeout fuction calling.
   */
  ngOnDestroy() { 
    clearTimeout(this.timer);
   }

   /**************************************************************************************
    * This function is for get live score.
    */
  getLiveMatchDetails(){
    this.MLBService.getLiveMatchDetails(this.localStorage.get("currentMatchId")).subscribe(
      (res:any)=>{
        this.liveScore = res.header_info;   
        this.timer = setTimeout(() => {
          this.getLiveMatchDetails();
        }, 2000);   
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }


}

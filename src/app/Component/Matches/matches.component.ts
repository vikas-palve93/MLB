import { Component, OnInit } from '@angular/core';
import { MLBServiceService } from '../../Services/mlbservice.service';
import { Router } from '@angular/router';
import { DataService } from "../../Services/data.service";
import { LocalStorageService } from 'angular-web-storage';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from "ng2-datepicker";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matchData:any;
  isRefreshDisabled: boolean = false;
  matchId: string;
  currentDateToUTCDate: any;
  selectedDate = new Date();
  currentDate = new Date();

    dateOptions: DatepickerOptions = {
    maxYear: new Date().getFullYear() + 1,
    displayFormat: "DD-MM-YYYY",
    barTitleFormat: "MMMM YYYY",
    dayNamesFormat: "dd",
    placeholder: "Select date",
    addClass: "custom-calender",
    fieldId: "start-date-picker",
    useEmptyBarTitle: false,
  };

  constructor(
    private MLBService: MLBServiceService,
    private router: Router,
    private data: DataService,
    private localStorage: LocalStorageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.convertDateToUTCDateAndGetMatchList();
    console.log(this.datePipe.transform(new Date().toUTCString(), 'yyyy-MM-dd'));
    
  }

  convertDateToUTCDateAndGetMatchList(){    
    this.currentDateToUTCDate = this.datePipe.transform(this.currentDate.toUTCString(), 'yyyy-MM-dd');
    console.log(this.currentDateToUTCDate);    
    this.getMatchList(0);
  }
  getMatchList(isRefresh){
    if(isRefresh === 1){
      this.isRefreshDisabled = true;
    }
    this.MLBService.getScheduleMatchList(this.currentDateToUTCDate).subscribe(
      (res:any)=>{
        this.matchData = res.matches;
        console.log("from",this.matchData.length);   
        this.isRefreshDisabled = false;     
      },
      (err:any)=>{
        console.log(err);
        this.isRefreshDisabled = false;
      }
    )
  }

  getScoreboard(matchId:any){
    this.data.setData(matchId);
    this.localStorage.set("currentMatchId", matchId);
    this.router.navigate(['scoreboard']);
  }

}

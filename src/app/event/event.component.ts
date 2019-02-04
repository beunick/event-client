import { Component, OnInit } from '@angular/core';

import { EventService } from '../common_component/event.service';
import { EventDisplayModel } from '../model/event_display.model';
import { PageInformationModel } from '../model/page_information.model';
import { EventDetailsModel } from '../model/event_details.model';
import { Observable, Observer } from 'rxjs';
import { EventRequestModel } from '../model/event_request.model'; 
import { DatePipe } from '@angular/common';
import { NgbdModalComponent, NgbdModalContent} from "../common_component/modal.component";



export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  private page:Number=0;
  private pages:Array<Number>;
  private eventDisplay:EventDisplayModel[] = [];
  private pageInformationModel:PageInformationModel= new PageInformationModel(0,0,0,0,0);
  private dateSelected:Date
  private dateSelectedFormated:string = "";
  private activeLink:string;
  private isWeekTabTrue:boolean;
  private isMonthTabTrue:boolean;
  private isQuarterTabTrue:boolean;
  private dateNotSelected:boolean;
  private eventReqModel:EventRequestModel = new EventRequestModel("","");
  private currentEventIdSelected:Number=0;
  private currentEventDetailsSelected:string="";
  private currentEventTypeSelected:string="";
  private eventDetailDate:string="";
  private isLoadingProcess:boolean;
  private noDataFound:boolean=false;
  private isServerError:boolean = false;
  private static weekPeriod:string    = "week";
  private static monthPeriod:string   = "month";
  private static quarterPeriod:string = "quarter";

  
  constructor(private eventService: EventService, private datePipe: DatePipe, private modal:NgbdModalComponent) {
    this.isWeekTabTrue = false;
    this.isMonthTabTrue = false;
    this.isQuarterTabTrue = false;
  }

  ngOnInit() { }

  getEventsByPeriod(){
    // Load the spinner 
    this.isLoadingProcess = true;
    this.isServerError = false; // Ensuring that the server Error Message is not displayed
    // Call Http Service and hide the spinner
    this.eventService.getEventByPeriod(this.page, this.eventReqModel).subscribe(
      (data:any) => {
        this.isLoadingProcess = false; // Remove the loading icon
        this.noDataFound = false; // Removing the No Found message
        this.eventDisplay = data["eventDisplayDto"];
        this.pageInformationModel.number = data["number"];
        this.pageInformationModel.numberOfElement = data["numberOfElement"];
        this.pageInformationModel.size = data["size"];
        this.pageInformationModel.totalElement = data["totalElement"];
        this.pageInformationModel.totalPages =  data["totalPages"];

        this.pages = new Array(this.pageInformationModel.totalPages);

        if(this.eventDisplay.length === 0){
          this.noDataFound = true;
        }
      },
      (error) =>{
        //Handle Error message
        this.errorHandle();
      }
    );

  }

  getEventDetailsById(){
    this.isServerError = false; // Ensuring that the server Error Message is not displayed
    this.eventService.getEventDetailsById(this.currentEventIdSelected).subscribe(
      (data:EventDetailsModel) =>{

        this.currentEventDetailsSelected = data.eventDetails;
        this.modal.open(this.currentEventDetailsSelected, this.eventDetailDate, this.currentEventTypeSelected);
      },
      (error) =>{
        //Handle Error message
        this.errorHandle();
      }
    );
  }



  getDetails(eventId:Number, eventDetailDate:string, eventType:string){
    
    this.currentEventIdSelected = eventId;
    this.eventDetailDate = eventDetailDate.slice(0,10);
    this.currentEventTypeSelected = eventType;

    this.getEventDetailsById();
  }


  setPage(i, event:any){
    event.preventDefault();
    this.page = i;
    this.getEventsByPeriod();
  }

  tabSelectedChanged(event:any){

    if ((this.dateSelectedFormated === "") || (this.dateSelectedFormated === undefined)){
      this.dateNotSelected = true;

    }else{
      // Date is being selected
      this.dateNotSelected = false;
      this.eventReqModel.eventDate = this.dateSelectedFormated;

      if (event["toElement"]["id"] === "nav-week-tab"){
        this.isWeekTabTrue = true;
        this.isMonthTabTrue = false;
        this.isQuarterTabTrue = false;

        // Set the Period 
        this.eventReqModel.eventPeriod    = EventComponent.weekPeriod;  
        // Reset the paging to 0    
        this.page=0;
        //Go fetch the data
        this.getEventsByPeriod();

      }else if(event["toElement"]["id"] === "nav-month-tab"){
        this.isWeekTabTrue = false;
        this.isMonthTabTrue = true;
        this.isQuarterTabTrue = false;

        // Reset the period
        this.eventReqModel.eventPeriod    = EventComponent.monthPeriod;
        // Reset the paging
        this.page = 0;
        //Go fetch the data
        this.getEventsByPeriod();

      }else if(event["toElement"]["id"] === "nav-quarter-tab"){
        this.isWeekTabTrue = false;
        this.isMonthTabTrue = false;
        this.isQuarterTabTrue = true;

        // Reset the period
        this.eventReqModel.eventPeriod    = EventComponent.quarterPeriod;
        // Reset the paging
        this.page=0;
        //Go fetch the data
        this.getEventsByPeriod();
      }
    }
  }

  dateChanged(event:any){
    this.isWeekTabTrue = false;
    this.isMonthTabTrue = false;
    this.isQuarterTabTrue = false;
    this.dateSelectedFormated = this.datePipe.transform(this.dateSelected["year"]+"-"+this.dateSelected["month"]+"-"+this.dateSelected["day"], 'yyyy-MM-dd');

  }

  errorHandle(){
    //Handle Error message
    this.isWeekTabTrue = false;
    this.isMonthTabTrue = false;
    this.isQuarterTabTrue = false;
    this.isServerError = true;
    this.noDataFound = false;
    this.dateNotSelected =false;
    this.eventDisplay = [];

  }
}

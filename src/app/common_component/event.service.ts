import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventRequestModel } from '../model/event_request.model'; 
import { EventDetailsModel } from '../model/event_details.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private numberOfElementPerPage : number =25;
  private fieldOfSorting: string = 'eventDate';
  private sortType: string = 'asc';

  private baseUrl:string="http://localhost:8080";
  private eventByPeriodUrl:string = this.baseUrl+"/events/period";
  private eventListUrl: string = this.baseUrl+"/events";
  private eventDetailUrl: string = this.baseUrl+"/event";

  constructor(private _http:HttpClient) { }

  getEvent(page:Number){
    return this._http.get(this.eventListUrl+'?size=2&page='+page+'&sort=eventDate,asc');
  }

  getEventByPeriod(page:Number, eventRequestModel:EventRequestModel){
    let url:string = this.eventByPeriodUrl+'?size='+this.numberOfElementPerPage
                                          +'&page='+page+'&sort='+this.fieldOfSorting+'&eventDate='+eventRequestModel.eventDate
                                          +'&eventPeriod='+eventRequestModel.eventPeriod;
    return this._http.get(url);
  }

  getEventDetailsById(eventId:Number){
    return this._http.get(this.eventDetailUrl+'?id='+eventId);
  }
}

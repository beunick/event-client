import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from './common_component/event.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from './tabs/tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'
import { NgbdModalComponent, NgbdModalContent } from "./common_component/modal.component";
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    TabsComponent,
    NgbdModalComponent,
    NgbdModalContent,
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    MatTabsModule,
    BrowserAnimationsModule,
    MomentModule
  ],
  entryComponents: [NgbdModalContent],
  providers: [EventService, DatePipe, NgbdModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

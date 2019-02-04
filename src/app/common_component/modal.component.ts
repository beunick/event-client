import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `

      <div class="modal-header" >
        <h4 class="modal-title"> Date: {{eventDate}}, Type: {{eventType}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" >
        <p>{{eventDetail}}</p>
      </div>
      <div class="modal-footer" >
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>


  `
})
export class NgbdModalContent {
  @Input() eventDetail;
  @Input() eventDate;
  @Input() eventType;


  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open(eventDetailContent:String, eventDate:string, eventType:string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.eventDetail = eventDetailContent;
    modalRef.componentInstance.eventDate   = eventDate;
    modalRef.componentInstance.eventType   = eventType;
  }
}
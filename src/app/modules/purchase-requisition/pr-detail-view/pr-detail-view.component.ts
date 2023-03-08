import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrLineHeaderDetail, PrLinesDetailResponseDto } from '../purchase-requisition';

@Component({
  selector: 'app-pr-detail-view',
  templateUrl: './pr-detail-view.component.html',
  styleUrls: ['./pr-detail-view.component.scss'],
})
export class PrDetailViewComponent {

   @Input() PrheaderDetail : PrLineHeaderDetail
   @Input() PrLinesDetail : PrLinesDetailResponseDto

  constructor(public modal: NgbModal) {}
  closeModel() {
    this.modal.dismissAll()
  }

  ngOnInit(){
    console.log("PrLinesDetail" ,this.PrLinesDetail)
  }
}


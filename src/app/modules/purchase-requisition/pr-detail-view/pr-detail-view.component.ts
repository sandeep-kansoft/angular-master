import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pr-detail-view',
  templateUrl: './pr-detail-view.component.html',
  styleUrls: ['./pr-detail-view.component.scss'],
})
export class PrDetailViewComponent {
  PrdetailItem!: PrDetails;

  constructor(public modal: NgbModal) {}
  closeModel() {
    this.modal.dismissAll()
  }
}

type PrDetails = {
  prid: number;
  PR_NUM: string;
  DESCRIPTION: string;
  CREATION_DATE: string;
  ApprovedDate: string;
  SiteName: number;
  PROJECT_NAME: string;
  DEPARTMENTNAME: string;
  PRTYPE: string;
  PRSubType: string;
  REQUESTED_BY: string;
  TotalValue: number;
  AssignBuyer: string;
  BUYERSTATUS: string;
};

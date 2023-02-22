import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
  isDarkTheme!: boolean;

  constructor(public modal: NgbModal) {}

  ngOnInit(): void {}

  close(type: string) {
    this.modal.dismissAll(type);
  }
}

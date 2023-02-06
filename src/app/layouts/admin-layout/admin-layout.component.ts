import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/shared/services/common/common-service.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public commonService: CommonService) {}

  ngOnInit(): void {}

}

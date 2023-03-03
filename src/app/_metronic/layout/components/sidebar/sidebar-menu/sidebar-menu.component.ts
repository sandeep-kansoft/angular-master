import { Component, OnInit } from '@angular/core';
import { IMenuDataDto } from 'src/app/shared/services/common.interface';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  menuList!:IMenuDataDto[];
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.menuListData$.subscribe((menuData) => {
      this.menuList = menuData;
      console.log("this.menuList : ",this.menuList )
    });
  }

}

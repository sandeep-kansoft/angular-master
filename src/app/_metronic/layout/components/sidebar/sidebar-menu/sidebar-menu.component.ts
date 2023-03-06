import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuDataDto } from 'src/app/shared/services/common.interface';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  menuList: IMenuDataDto[];
  activeLink:string;
  
  constructor(private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.commonService.menuListData$.subscribe((menuData) => {
      if (menuData) {
        this.menuList = menuData;
        //console.log("this.menuList Json data : ", JSON.stringify(this.menuList))
        console.log("this.menuList : ",this.menuList)
      }
      this.cdr.detectChanges();
    });
  }

  clickOnItem(childMenu:any){
    this.activeLink = childMenu.menuCode;
    this.router.navigate(['/purchase-requisition/'+childMenu.menuCode]);
  }

}

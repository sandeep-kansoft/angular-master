import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  constructor() {
  //  console.log( window.location.href;)
  }
  currentRoute = window.location.href;
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges){
   console.log(changes)
  }
}

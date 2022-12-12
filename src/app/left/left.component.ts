import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
after: "after"|"before";
before: "before"|"after";

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {ErrorMsgService} from "./error-msg.service";

@Component({
  selector: 'error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  constructor(public errorMsgService: ErrorMsgService) { }

  ngOnInit() { }

}

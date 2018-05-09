import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  private isErrorSubject = new BehaviorSubject<string>('');
  isError$ = this.isErrorSubject.asObservable();

  constructor() { }

  showErrorMsg(message: string) {
    this.isErrorSubject.next(message);
  }
}

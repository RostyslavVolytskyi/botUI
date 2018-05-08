import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import {SpinnerInfo} from './spinner-info.model';

/**
 * This service is to enable/disable main spinner.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private subject = new BehaviorSubject<SpinnerInfo>({
    isSpinnerVisible: false,
    isSpinnerMessageVisible: false
  });
  private activeObservablesCount = 0;

  constructor() { }

  /**
   * Enable main spinner when we have a least one request and disable it when we have 0 active requests.
   *
   * @param {Observable<any>} obs$
   * @param {boolean} isSpinnerMessageVisible
   */
  spinUntilDone(obs$: Observable<any>, isSpinnerMessageVisible = false): void {
    this.activeObservablesCount++;
    this.switchSpinner(true, isSpinnerMessageVisible);

    obs$.subscribe(null, (err) => {
      this.checkAndDeactivateSpinner();
    }, () => {
      this.checkAndDeactivateSpinner();
    });
  }

  getSpinner(): Observable<SpinnerInfo> {
    return this.subject;
  }

  private checkAndDeactivateSpinner() {
    this.activeObservablesCount--;
    if (this.activeObservablesCount === 0) {
      this.switchSpinner(false, false);
    }
  }

  private switchSpinner(isSpinnerVisible: boolean, isSpinnerMessageVisible: boolean): void {
    this.subject.next({isSpinnerVisible, isSpinnerMessageVisible});
  }

}

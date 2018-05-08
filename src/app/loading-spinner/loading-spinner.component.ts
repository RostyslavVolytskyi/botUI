import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {LoadingSpinnerService} from './loading-spinner.service';
import {SpinnerInfo} from './spinner-info.model';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  spinnerInfo$: Observable<SpinnerInfo>;

  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerInfo$ = this.loadingSpinnerService.getSpinner();
  }
}

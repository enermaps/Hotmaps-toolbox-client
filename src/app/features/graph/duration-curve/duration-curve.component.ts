import { Component, Input, OnInit, OnChanges, OnDestroy, AfterViewInit, ViewChild, SimpleChanges } from '@angular/core';

import { DatasetChart } from 'app/features/graph/chart/chart';
import { Logger } from '../../../shared/services/logger.service';
import { Helper } from 'app/shared';
import { InteractionService } from 'app/shared/services/interaction.service';
import { constant_year_duration_curve, duration_curve_graph_options } from '../../../shared/data.service';
import { PlayloadStatNuts, PayloadStat, Area } from 'app/features/summary-result/class/payload.class';
import { Layer} from '../../summary-result/summary-result.class';


@Component({
  selector: 'htm-duration-curve',
  templateUrl: './duration-curve.component.html',
  styleUrls: ['./duration-curve.component.css']
})
export class DurationCurveComponent implements OnInit, OnChanges, OnDestroy {
  @Input() expanded: boolean;
  @Input() durationCurvePayload;
  @Input() scaleLevel;
  @Input() heatloadStatus;
  @Input() areas: Layer[];
  private type = 'line';
  private datasets: DatasetChart[];
  private labels = [];
  private options: any;
  private subtitle = 'Duration curve';
  private loadingData = false;


  constructor(private logger: Logger, private helper: Helper, private interactionService: InteractionService) {
	}

  ngOnInit() {
  	this.logger.log('DurationCurveComponent/ngOnInit');
    // this.update();
  }

  ngOnDestroy() {
    this.logger.log('DurationCurveComponent/ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logger.log('DurationCurveComponent/ngOnChanges');
    this.update();
  }

  update() {
  	this.logger.log('DurationCurveComponent/update');
    let isHectare = false;
    let payload: any;
    if (this.scaleLevel === '-1'){ // updating chart with data by hectare
      isHectare = true;

      payload = this.helper.createDCPayloadHectares(constant_year_duration_curve, this.durationCurvePayload.areas);
    }else{ // updating chart with data by nuts
      payload = this.helper.createDCPayloadNuts(constant_year_duration_curve, this.durationCurvePayload.nuts);
    }
    this.loadingData = true;

    this.interactionService.getDurationCurveWithPayload(payload, isHectare).then((result) => {
        // this.datasets = this.interactionService.transformDurationCurveData(result);
	  		this.labels = this.helper.createDurationCurveLabels(this.labels);
        this.options = duration_curve_graph_options;
      }).then(() => {
        this.loadingData = false;
      });
  }
}

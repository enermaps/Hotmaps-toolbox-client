import { inject, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import {DecimalPipe, Location} from '@angular/common';
import { SelectionToolComponent } from '../component/selection-tool.component';
import { SelectionScaleService } from '../../selection-scale/selection-scale.service';
import { SelectionToolService } from './selection-tool.service';
import { Logger } from '../../../shared/services/logger.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ToasterService } from '../../../shared/services/toaster.service';
import {BusinessInterfaceRenderService} from '../../../shared/business/business.service';
import { SidePanelService } from '../../side-panel/side-panel.service';
import { MapService } from '../../../pages/map/map.service';
import { InteractionService } from '../../../shared/services/interaction.service';
import { NavigationBarService } from '../../../pages/nav/service/navigation-bar.service';
import { SummaryResultService } from '../../summary-result';
import { LayersService } from '../../layers';
import { Helper } from '../../../shared/helper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SummaryResultComponent} from '../../summary-result/summary-result.component';
import {UppercaseFirstLetterPipe} from '../../../shared/pipes/uppercase-first-letter.pipe';
import {NumberFormatPipe} from '../../../shared/pipes/number-format.pipe';
import {LayerNamePipe} from '../../../shared/pipes/layer-name.pipe';
import {BusinessNamePipe} from '../../../shared/pipes/business-name.pipe';
import {SelectionToolButtonStateService} from './selection-tool-button-state.service';
import {MailService} from '../../feedback/mail.service';
import {PopulationService} from '../../population/services/population.service';
import {GeocodingService} from '../../../shared/services/geocoding.service';
import {DataInteractionService} from '../../layers-interaction/layers-interaction.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TopSideComponent} from '../../side-panel/top-side-panel/top-side-panel.component';
import {FeedbackComponent} from '../../feedback/component/feedback.component';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import { MouseEvent, Map, LayersControlEvent } from 'leaflet';
import {HeatLoadAggregateService} from '../../graph/heat-load/heat-load.service';
import { SelectionToolUtils } from 'app/features/selection-tools/service/selection-tool-utils.service';
import {ExportDataService} from '../../export-data/service/export-data.service';
import { DurationCurveService } from "../../graph/duration-curve/duration-curve.service";
import {ElectricityMixService} from "../../graph/electricity-mix/service/electricity-mix.service";
import { CalculationModuleService } from "app/features/calculation-module/service/calculation-module.service";
import { CalculationModuleStatusService } from "app/features/calculation-module/service/calcultation-module-status.service";
import { CalculationHeatLoadDividedService } from "app/features/calculation-module/service/calculation-test.service";
import {GoogleAnalyticsService} from "../../../google-analytics.service";


describe('SelectionToolService', () => {
    let service: SelectionToolService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule],
            providers: [
                {provide: SelectionToolService, useClass: SelectionToolService},
                {provide: HeatLoadAggregateService, useClass: HeatLoadAggregateService},
                {provide: SelectionToolUtils, useClass: SelectionToolUtils},
                SelectionScaleService, ElectricityMixService, Logger, LoaderService, ToasterService, SelectionToolService, Helper, DecimalPipe,
                BusinessInterfaceRenderService, SidePanelService, InteractionService, NavigationBarService, SummaryResultService,
                LayersService, MapService, SelectionToolButtonStateService, MailService, PopulationService, GeocodingService,
                DataInteractionService, ExportDataService, DurationCurveService,
                { provide: CalculationModuleService, useClass: CalculationModuleService},
                { provide: CalculationModuleStatusService, useClass: CalculationModuleStatusService},
                { provide: CalculationHeatLoadDividedService, useClass: CalculationHeatLoadDividedService},
              { provide: GoogleAnalyticsService, useClass: GoogleAnalyticsService}
            ]
        })
    }));
    beforeEach(inject([SelectionToolService], (selectionToolService: SelectionToolService) => {
        service = selectionToolService;
    }));

    // INIT TESTS
    it('selection tool service should be created', () => {
        expect(service).toBeTruthy()
    });

    it('no drawer should be activated at start', () => {
        expect(service.getDrawer()).toBeUndefined()
    });

    it('polygon tool state should be false at start', () => {
        expect(service.getPolygonDrawerState()).toBeFalsy()
    });
    /*it('should not be open at start', () => {
        expect(service.rightPanelStatus.value).toBeFalsy()
        expect(service.leftPanelStatus.value).toBeFalsy()
    });

    // RIGHT PANEL TESTS
    it('should open right panel', () => {
        service.openRightPanel();
        expect(service.rightPanelStatus.value).toBeTruthy()
    });
    it('should close right panel', () => {
        service.closeRightPanel()
        expect(service.rightPanelStatus.value).toBeFalsy()
    });

    // LEFT PANEL TESTS
    it('sould open left panel', () => {
        service.openLeftPanel()
        expect(service.leftPanelStatus.value).toBeTruthy()
    });
    it('should close left panel', () => {
        service.closeLeftPanel()
        expect(service.leftPanelStatus.value).toBeFalsy()
    });*/
})

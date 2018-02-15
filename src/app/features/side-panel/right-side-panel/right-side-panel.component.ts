// TODO: Improvement of coding style :
// TODO: leaving one empty line between third party imports and application imports
// TODO: listing import lines alphabetized by the module
import { NavigationBarService } from './../../../pages/nav/service/navigation-bar.service';
import { BusinessInterfaceRenderArray } from './../../../shared/business/business.data';
import { GeojsonClass } from './../../layers/class/geojson.class';
import {
    Component,
    OnInit,
    OnDestroy,
    trigger,
    state,
    style,
    transition,
    animate,
    Input,
  OnChanges
} from '@angular/core';
import { SideComponent } from '../side-panel.component';
import { SummaryResultClass } from './../../summary-result/summary-result.class';
import { HeatLoadClass } from '../../heat-load/heat-load.class';
import { InteractionService } from 'app/shared/services/interaction.service';
import { rightPanelSize, nuts2 } from 'app/shared';
import {Logger} from "../../../shared/services/logger.service";


@Component({
    moduleId: module.id,
    selector: 'htm-right-side-panel',
    templateUrl: 'right-side-panel.component.html',
    styleUrls: ['right-side-panel.component.css'],
    animations: [
        // Define the animation used on the containing dev where the width of the
        //  panel is determined. Here we define the expanded width to be 300px, and
        //  the collapsed width to be 38px.
        //
        // When expanding the panel we transition over a 200ms interval.
        //
        // When collapsing the panel we again use 200ms for the transition, but
        //  we add a delay of 200ms to allow some other animations to complete before
        //  shrinking the panel down.
        //
        trigger('panelWidthTrigger', [
            state('expanded', style({ width: rightPanelSize + 'px' })),
            state('collapsed', style({ width: '0px' })),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms 200ms ease-out'))
        ]),

        // Define the animation used in the title bar where the colors swap from
        //  a red foreground with white background, to the opposite. In this case
        //  we use the same timings as the width animation above so these two
        //  transitions happen at the same time
        //
        trigger('titleColorTrigger', [
            state('collapsed', style({ backgroundColor: '#FFFFFF', color: '#d3d3d3' })),
            state('expanded', style({ backgroundColor: '#333333', color: '#FFFFFF' })),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms 200ms ease-out'))
        ]),

        // The title text trigger is a little different because it's an animation
        //  for an element being added to the DOM. Here we take advantage of the 'void'
        //  transition using a hard-coded state called 'in' (which is also hard coded in
        //  the template).
        //
        // What we do in this animation is say when the element is added to the DOM
        //  it should have an opacity of 0 (i.e., hidden), wait 300ms, and then animate
        //  it's opacity change to 1 over a 100 ms time span. This effectively delays the
        //  appearance of the text until after the panel has slid out to the full size.
        //
        // When the element is removed we take a different approach and animate the
        //  opacity change back to 0 over a short 50ms interval. This ensures it's gone before
        //  the panel starts to slide back in, creating a nice effect.
        //
        trigger('titleTextTrigger', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [style({ opacity: '0' }),
            animate('100ms 300ms')
            ]),
            transition('* => void', [
                animate('50ms', style({ opacity: '0' }))
            ])
        ]),

        // Define the animation used in the arrow icon where it rotates to point left
        //  or right based on the state of the panel. In this case we use the same
        //  timings as the width animation above so these two transitions happen at
        //  the same time.
        //
        trigger('iconTrigger', [
            // state('collapsed', style({ transform: 'rotate(0deg)' })),
            //  state('expanded', style({ transform: 'rotate(180deg)' })),

            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms ease-out'))
        ])
    ]
})
export class RightSideComponent extends SideComponent implements OnInit, OnDestroy, OnChanges {
    // Improvement of coding style :
    // place private members after public members, alphabetized
    private summaryResult: SummaryResultClass = null;
    private poiTitle;
    @Input() nutsIds;
    @Input() layers;
    @Input() scaleLevel;
    private heatloadStatus = false;
    @Input() locationsSelection;
    @Input() areas;


    constructor(protected interactionService: InteractionService, private logger: Logger) {
        super(interactionService);
    }
    ngOnInit() { }
    ngOnDestroy() { }
    ngOnChanges() {
        if ((this.scaleLevel === '3') || (this.scaleLevel === '2')) {
            this.heatloadStatus = true;
        } else {
            this.heatloadStatus = false;
        }
    }
    clickTab(id: string) {
      this.logger.log('clickTab' + id);
      this.interactionService.setTabsSelectedName(id);
    }


}

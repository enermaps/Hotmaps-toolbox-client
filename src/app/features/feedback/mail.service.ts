import { Injectable } from '@angular/core';


import { NavigationButton } from '../../pages/nav/navigation-bar.class';
import { navigationButtons } from '../../pages/nav/navigation-buttons.data';
import { MapService } from '../../pages/map/map.service';
import { SelectionToolButtonStateService } from '../selection-tools/selection-tool-button-state.service';
import { SidePanelService } from '../side-panel/side-panel.service';
import {Properties} from "./properties.utils";
import {Platform, platforms} from "./platforms.utils";
import {Logger} from "../../shared/services/logger.service";

@Injectable()
export class MailService {
  properties: Properties = {};
  platform: Platform;
  url: string;
    constructor(private logger: Logger) { }
    sendEmail() {
      this.initService();
      window.open(this.url, 'newwindow', 'width=1070, height=600');
     // event.preventDefault();
    }
    initService() {
      if (!this.url) {
        this.platform = platforms['mail'];
        this.fetchProperties();
        this.constructUrl();
      }
    }
  fetchProperties() {
    this.properties.url = this.properties.url || this.getMetaContent('og:url') || window.location.href.toString();
    this.properties.title = this.properties.title || this.getMetaContent('og:title') || document.title;
    this.properties.description = this.properties.description || this.getMetaContent('og:description');
    this.properties.image = this.properties.image || this.getMetaContent('og:image');
    this.properties.via = this.properties.via || this.getMetaContent('n2s:via');
    this.properties.hashtags = this.properties.hashtags || this.getMetaContent('n2s:hashtags');
    for (let p in this.properties) {
      if (this.properties.hasOwnProperty(p)) {
        this.properties[p] = encodeURIComponent(this.properties[p]);
      }
    }
  }

  constructUrl() {
    this.url = this.platform.url + this.properties.url;
    if (this.platform.properties) {
      for (let key in this.platform.properties) {
        // if the property has been found.
        let val = this.properties[this.platform.properties[key]];
        if (val) {
          this.url += `&${key}=${val}`;
        }
      }
    }
  }
  getMetaContent(property: string) {
    const elem = document.querySelector(`meta[property='${property}']`);
    if (elem)
      return elem.getAttribute('content');
    return '';
  }

}
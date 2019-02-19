import { Component } from '@angular/core';
import {LoopBackConfig} from "./shared/sdk";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor() {
    LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
    LoopBackConfig.setApiVersion('api');
  }
}

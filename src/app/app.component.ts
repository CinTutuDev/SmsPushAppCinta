import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private push: PushService,  
    private platform: Platform,) { 
      this.initializeApp();}

      initializeApp() {
    this.platform.ready().then(() => {
      this.push.oneSignalInit();
    });
  }
}

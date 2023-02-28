import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';
import { OSNotificationPayload } from '@awesome-cordova-plugins/onesignal/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mensajes: OSNotificationPayload[]=[];

  constructor(public push: PushService,private applicationRef: ApplicationRef  ) {}

  ngOnInit() {

    this.push.pushListener.subscribe(( noti: any) => {
      this.mensajes.unshift(noti);
      this.applicationRef.tick();
    });
  }

  async ionViewDidEnter() {
    console.log('Will enter cargar SMS');
  this.mensajes =  await this.push.getMsm();
  }

}

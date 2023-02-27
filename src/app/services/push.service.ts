import { Injectable } from '@angular/core';

import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
@Injectable({
  providedIn: 'root',
})
export class PushService {
  constructor(private oneS: OneSignal) {}

  confInit() {
    /* ids=  */
    this.oneS.startInit(
      /* https://dashboard.onesignal.com/apps/97d69f25-f6ac-440c-ad0a-352465c01b7c/settings/keys_and_ids */
      '97d69f25-f6ac-440c-ad0a-352465c01b7c',
      /*  ID de remitente de firebase*/
      '842589575805'
    );
    /* ahiora  */

    this.oneS.inFocusDisplaying(this.oneS.OSInFocusDisplayOption.InAppAlert);

    this.oneS.handleNotificationReceived().subscribe((notif) => {
      // do something when notification is received
      console.log('Notificación recibida', notif);
    });

    this.oneS.handleNotificationOpened().subscribe((notif) => {
      // do something when a notification is opened
      console.log('Notificacón abierta', notif);
    });

    this.oneS.endInit();
  }
}

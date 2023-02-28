import { Injectable } from '@angular/core';
/* import OneSignal from 'onesignal-cordova-plugin'; */
import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';
@Injectable({
  providedIn: 'root',
})
export class PushService {
  sms: any[] = [
    {
      title: 'Titulo de la push',
      body: 'Este es el body de push',
      date: new Date(),
    },
  ];

  OneSignalAppId: string = environment.oneSignal;
  idRemitenteFire: string = environment.idFireremi;

  constructor() {}

  oneSignalInit(): void{
    //OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(this.OneSignalAppId);
    OneSignal.setNotificationOpenedHandler( jsonData => {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
 
    OneSignal.promptForPushNotificationsWithUserResponse( accepted => {
        console.log('User accepted notifications: ' + accepted);
    });
 
    OneSignal.getDeviceState( resp => {
      //this.storage.set('push_id', resp.userId);
    });
  }
 

}

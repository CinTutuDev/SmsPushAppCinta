import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';
/* import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx'; */
@Injectable({
  providedIn: 'root',
})
export class PushService {


  OneSignalAppId: string = environment.oneSignal;
  idRemitenteFire: string = environment.idFireremi;

  constructor() {}

  confInit() {

    OneSignal.setAppId(this.OneSignalAppId);
    OneSignal.setNotificationOpenedHandler((jsonData) =>{
      console.log('notificacion Open CallBAck recibida: ' + JSON.stringify(jsonData));
    })

    OneSignal.promptForPushNotificationsWithUserResponse((accept)=>{
      console.log('Notificacion aceptada ' + accept);
    })
   
  }
}

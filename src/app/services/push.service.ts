import { Injectable } from '@angular/core';
/* import OneSignal from 'onesignal-cordova-plugin'; */
import { environment } from 'src/environments/environment';
import { OneSignal, OSNotification } from '@awesome-cordova-plugins/onesignal/ngx'
/* import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification'; */
/* import OneSignal from 'onesignal-cordova-plugin'; */
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

  constructor(private oneSignal: OneSignal) {}

  async oneSignalInit(){
    this.oneSignal.startInit(this.OneSignalAppId, this.idRemitenteFire);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe(async(noti) => {
      console.log('Notificació n recibida', noti );

      this.notificacionRecibida(noti);
     // do something when notification is received
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      console.log('Notificación abierta', noti );
      // do something when a notification is opened
    });
    
    this.oneSignal.endInit();

    //OneSignal.setLogLevel(6, 0);
    /* OneSignal.setAppId('97d69f25-f6ac-440c-ad0a-352465c01b7c');
    OneSignal.setNotificationOpenedHandler( jsonData => {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
 
    OneSignal.promptForPushNotificationsWithUserResponse( accepted => {
        console.log('User accepted notifications: ' + accepted);
    });
 
    OneSignal.getDeviceState( resp => {
      //this.storage.set('push_id', resp.userId);
    }); */
  }
 
   notificacionRecibida( noti : OSNotification) {

   const payload = noti.payload;
   const siExiste = this.sms.find(msg => msg.notificationID === payload?.notificationID)

   if(siExiste){ return; }

   this.sms.unshift(payload);

  }

}

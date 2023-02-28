import { Injectable, EventEmitter } from '@angular/core';
/* import OneSignal from 'onesignal-cordova-plugin'; */
import { environment } from 'src/environments/environment';
import {
  OneSignal,
  OSNotification,
  OSNotificationPayload,
} from '@awesome-cordova-plugins/onesignal/ngx';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class PushService {
  private _storage: Storage | null = null;
  sms: OSNotificationPayload[] = [
    // {
    //   title: 'Titulo de la push',
    //   body: 'Este es el body de la push',
    //   date: new Date()
    // }
  ];
  userId: string | undefined;

  pushListener = new EventEmitter<OSNotificationPayload>();
  OneSignalAppId: string = environment.oneSignal;
  idRemitenteFire: string = environment.idFireremi;

  constructor(private oneSignal: OneSignal, private storage: Storage) {
    this.cargarMensajes();
  }

  async getMsm(){
    await this.cargarMensajes();
    return [...this.sms];
  }


  async oneSignalInit() {
    this.oneSignal.startInit(this.OneSignalAppId, this.idRemitenteFire);

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe(async (noti : any) => {
      console.log('Notificació n recibida', noti);

     await this.notificacionRecibida(noti.notification);
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      console.log('Notificación abierta', noti);
      // do something when a notification is opened
    });

     // Obtener ID del suscriptor
     this.oneSignal.getIds().then( info => {
      this.userId = info.userId || this.OneSignalAppId;
      console.log(this.userId);
    });
    console.log(this.userId);
    this.oneSignal.endInit();
    console.log(this.userId);
  }

  async notificacionRecibida(noti: OSNotification) {
    await this.cargarMensajes();
    const payload = noti.payload;
    const siExiste = this.sms.find(
      (msg) => msg.notificationID === payload?.notificationID
    );

    if (siExiste) {
      return;
    }

    this.sms.unshift(payload!);
    this.pushListener.emit(payload);
    await this.guardarMensajes();
  }

  guardarMensajes() {
    this.storage.set('mensajes', this.sms);
  }

  async cargarMensajes() {
    
    this.sms = (await this.storage.get('mensajes')) || [];

    return this.sms;
  }
}

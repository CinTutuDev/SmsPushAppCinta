# SmsPushAppCintas <br> Proyecto realizado con ![angular](https://user-images.githubusercontent.com/71487857/212993270-3cf1454e-f0d7-4164-bc01-20d5fe6469cd.png)Angular/![descarga](https://user-images.githubusercontent.com/71487857/212993697-6234ef26-0e4a-40ce-bc8a-a9bfa858a74b.png)Ionic 

## ✔Comienzo el proyecto en blanco:

```
    ionic start SmsPushApp blank
   ? Framework: Angular

```
## Servicio para enviar y recibir notificaciones y API

```
https://onesignal.com/
```
## Creamos proyecto en Firebase 

```
https://console.firebase.google.com/

* Nos vamos a cloud Messaging
```

## Cinfiguración de OneSignal 

* URL
```
https://ionicframework.com/docs/v5/native/onesignal
```

* Comandos:
```
$ ionic cordova plugin add onesignal-cordova-plugin 
$ npm install @awesome-cordova-plugins/onesignal 

❗❗Si sale error (Refusing to run ionic cordova plugin inside a Capacitor project):

$ ionic integrations disable capacitor
$ ionic cordova plugin add onesignal-cordova-plugin 
$ npm install @awesome-cordova-plugins/onesignal 
```
* Importo el servicio en app.module
 ```
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
providers: [
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
```

## Crear servicio encargado de las notificaciones

```
ionic g s services/push --skip-tests
```

* Hacemos import y creamos un metodo 
```
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

constructor(private oneSignal: OneSignal) {}

 configInit() {
    this.oneSignal.startInit(
    (el 1º va el api key de onesignal)
      'b2f7f966-d8cc-11e4-bed1-df8f05be55ba',
      (el 2º va el ID de remitente de firebase)
      '703322744261'
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.InAppAlert
    );

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
```
## ![androide36](https://user-images.githubusercontent.com/71487857/199188171-195d30ba-e4b6-4f3f-bea1-bbf09369c70a.jpg) LEVANTAR APP EN ANDROID

```
1º Capacitor
  ionic capacitor add android
2º Para actualizar android
  ionic capacitor copy android
3aº Levantar en movil
  ionic capacitor run android
            ó
3bº ionic capacitor run android -l --external
```
## 🔎 Herramientas de desarrollo

```
More tools --> remote deivces
*Si no lo encuentro escribo esto :
chrome://inspect/#devices
*En Port forwarding... poner el puerto (localhost:8100) y darle a done
```
## ![descarga](https://user-images.githubusercontent.com/71487857/214578135-16d1a768-8961-4099-82ce-43045983b5f6.png)@ionic/storage

```
 URL
 https://github.com/ionic-team/ionic-storage

 *Instalación
 npm install @ionic/storage

 *Instalar biblioteca Angular
 npm install @ionic/storage-angular

 *Como es un módulo va en los imports:
 import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicStorageModule.forRoot(),
    OJO ❗❗ si sale error reiniciar code❗❗ 
  ]
})
export class AppModule { }



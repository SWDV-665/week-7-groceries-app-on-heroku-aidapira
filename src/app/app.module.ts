import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroceriesServiceService } from './providers/groceries-service/groceries-service.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    SocialSharing, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    GroceriesServiceService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSplideModule } from 'ngx-splide';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageModule } from './pages/homepage/homepage.module';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { it_IT } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import it from '@angular/common/locales/it';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

registerLocaleData(it);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomepageModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: it_IT },
    NgxSplideModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

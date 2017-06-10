import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SpellService } from './spell.service';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { ViewComponent } from './view.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SpellService],
  bootstrap: [AppComponent]
})
export class AppModule { }

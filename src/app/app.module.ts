import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SpellService } from './spell.service';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { ViewComponent } from './view.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'spell/:name', component: ViewComponent },
  { path: '**', component: ListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SpellService],
  bootstrap: [AppComponent]
})
export class AppModule { }

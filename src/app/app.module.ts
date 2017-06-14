import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SpellService } from './spell.service';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { ViewComponent } from './view.component';
import { ViewSelectorComponent } from './view-selector.component';
import { ColumnsComponent } from './columns.component';

const routes: Routes = [
  { path: '', component: ViewSelectorComponent },
  { path: 'spell/:name', component: ViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent,
    ViewSelectorComponent,
    ColumnsComponent
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

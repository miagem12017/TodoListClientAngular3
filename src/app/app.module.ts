import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';


import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

import { TodoListService } from "./todo-list.service";
import {HttpModule} from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { ModaleAddComponent} from "./modales/modale-add.component";

const appRoutes: Routes = [
  {
    path: 'lists',
    // canActivate: [AuthService],
    component: ListsComponent,
    data: { /*title: ''*/ }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    ListsComponent,
    ModaleAddComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true} )
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();
  modalActions = new EventEmitter<string|MaterializeAction>();
  @Output() sendUpdateTonif = new EventEmitter<any>();
  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  getCurrentSelectedList(list) {
    this.list = list;
  }

  createList(name: string) {
    if (name !== '') {
      const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
        color: "#FF0000",
        someOtherAttribute: "pourquoi pas un texte ?"
        // Add other data here...
      });
    }
  }

  openModal () {
    this.modalActions.emit ({action: "modal", params: ['open']});
  }
  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }
  // A revoir ... doit retourner une liste
  getListByID(listId: string): TodoListWithItems {
    for (const currList of this.getLists()) {
      if (currList.id === listId) {
        return currList;
      }
    }
  }
}

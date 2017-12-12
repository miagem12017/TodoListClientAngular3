import {ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {MaterializeAction} from 'angular2-materialize';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  @Output() notifyForUpDate= new EventEmitter<any>();
  modalActions = new EventEmitter<string|MaterializeAction>();
  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  createItem(label: string, newDate: string, newDescription: string) {
    if (label !== '') {
      const id = this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false, {
        itemDate: newDate,
        itemDescription: newDescription
      });
      this.closeModal();
    }
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }

 editListName(newListName: string) {
   this.list.name = newListName;
   this.notifyForUpDate.emit();
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }

  hideAddModale() {
    document.getElementById('addItemToCurrList' + this.list.id).style.display = 'none' ;
  }

  showAddModale() {
    document.getElementById('addItemToCurrList' + this.list.id).style.display = 'block' ;
  }

  openModal () {
    this.modalActions.emit ({action: "modal", params: ['open']});
  }
  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }
}

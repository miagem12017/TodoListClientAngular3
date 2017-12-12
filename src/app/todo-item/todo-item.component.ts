import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  showEditModal() {
    document.getElementById('editItem' + this.listId + this.item.id).style.display = 'block';
  }
  hideEditModal() {
    document.getElementById('editItem' + this.listId + this.item.id).style.display = 'none';
  }
  showDeleteModal() {
    document.getElementById('deleteItem' + this.listId + this.item.id).style.display = 'block';
  }
  hideDeleteModal() {
    document.getElementById('deleteItem' + this.listId + this.item.id).style.display = 'none';
  }
  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
    this.openModalNew();
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
    this.hideDeleteModal();
  }

  setItem(label: string, newDate: Date, newDescription: string) {
    if (label === "" && newDate === null) {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
      console.log(label);
      this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, {itemDate: newDate, itemDescription: newDescription});
    }
    this.editLabel(false);
    this.closeModalNew();
  }

  showDisplayModal() {
    document.getElementById('displayItem' + this.listId + this.item.id).style.display = 'block';
  }
  hideDisplayModal() {
    document.getElementById('displayItem' + this.listId + this.item.id).style.display = 'none';
  }

  // Nouvelles modales
  openModalNew() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }
  closeModalNew() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import {
  add_ingredient,
  delete_ingredient,
  stop_edit,
  update_ingredient,
} from '../store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription = this.store
      .select((state: fromApp.AppState) => state.shoppingList)
      .subscribe((storeData) => {
        if (storeData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = storeData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else this.editMode = false;
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(update_ingredient({ ingredient: newIngredient }));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(add_ingredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(stop_edit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(delete_ingredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(stop_edit());
  }
}

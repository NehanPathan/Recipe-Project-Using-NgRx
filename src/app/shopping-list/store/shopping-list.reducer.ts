import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  add_ingredient,
  add_ingredients,
  delete_ingredient,
  start_edit,
  stop_edit,
  update_ingredient,
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(add_ingredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action],
  })),

  on(add_ingredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients],
  })),

  on(update_ingredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.map((item, index) =>
      index === state.editedIngredientIndex ? action.ingredient : item
    ),
    editedIngredient: null,
    editedIngredientIndex: -1,
  })),

  on(delete_ingredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter(
      (_, index) => index !== state.editedIngredientIndex
    ),
  })),

  on(start_edit, (state, action) => ({
    ...state,
    editedIngredientIndex: action.index,
    editedIngredient: { ...state.ingredients[action.index] },
  })),

  on(stop_edit, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  }))
);

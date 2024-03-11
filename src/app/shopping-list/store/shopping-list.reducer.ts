import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  add_ingredient,
  add_ingredients,
  delete_ingredient,
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
    ingredients: state.ingredients.map((ingredient, index) => {
      if (index === action.index) return action.ingredient;
      return ingredient;
    }),
  })),
  on(delete_ingredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.filter(
      (ingredient, index) => index !== action.index
    ),
  }))
);

import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { add_ingredient } from './shopping-list.actions';


const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export const shoppingListReducer = createReducer(
    initialState,
    on(add_ingredient, (state, action) => ({...state, ingredients: [...state.ingredients, action]}))

    );

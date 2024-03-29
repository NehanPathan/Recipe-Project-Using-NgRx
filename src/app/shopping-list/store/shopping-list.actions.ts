import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const add_ingredient = createAction(
  '[Shopping-list] Add_Ingredeint',
  props<Ingredient>()
);
export const add_ingredients = createAction(
  '[Shopping-list] Add_Ingredeints',
  props<{ ingredients: Ingredient[] }>()
);

export const update_ingredient = createAction(
  '[Shopping-list] Update_Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const delete_ingredient = createAction(
  '[Shopping-list] Delete_Ingredient'
);

export const start_edit = createAction(
  '[Shopping-list] Start_Edit',
  props<{ index: number }>()
);
export const stop_edit = createAction('[Shopping-list] Stop_Edit');

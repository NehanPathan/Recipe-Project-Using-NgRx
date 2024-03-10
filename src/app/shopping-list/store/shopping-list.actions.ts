import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const add_ingredient = createAction(
    '[Shopping-list] Add_Ingredeint',
    props<Ingredient>()
)
export const add_ingredients = createAction(
    '[Shopping-list] Add_Ingredeints',
    props<{ ingredients: Ingredient[] }>()
)
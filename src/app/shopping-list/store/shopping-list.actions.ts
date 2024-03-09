import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const add_ingredient = createAction(
    '[Shopping-list] Add_Ingredeint',
    props<Ingredient>()
)
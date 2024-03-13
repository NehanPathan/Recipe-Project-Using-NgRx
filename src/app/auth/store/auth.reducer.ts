import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';

export interface State {
  user: User;
}
export interface AppState {
  auth: State;
}

const initialState: State = {
  user: null,
};

export const authReducer = createReducer(initialState);

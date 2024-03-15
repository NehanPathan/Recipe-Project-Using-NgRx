import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import { login, logout } from './auth.actions';

export interface State {
  user: User;
}
export interface AppState {
  auth: State;
}

const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => ({
    ...state,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  })),
  on(logout, (state, action) => ({
    ...state,
    user: null,
  }))
);

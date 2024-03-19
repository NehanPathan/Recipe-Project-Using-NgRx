import { createAction, props } from '@ngrx/store';

export const login_Start = createAction('[Auth] Login_Start');

export const login = createAction(
  '[Auth] Login',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);
export const logout = createAction('[Auth] Logout');

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
  authLogin = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.login_Start)),
    { dispatch: false }
  );
  constructor(private actions$: Actions) {}
}

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  authLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login_Start),
        switchMap((authData) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                environment.firebaseAPIKey,

              {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              map((resData) => {
                const expirationDate = new Date(
                  new Date().getTime() + +resData.expiresIn * 1000
                );

                return of(
                  AuthActions.login({
                    email: resData.email,
                    userId: resData.idToken,
                    token: resData.idToken,
                    expirationDate: expirationDate,
                  })
                );
              }),
              catchError((error) => {
                //...
                return of();
              })
            );
        })
      ),

    { dispatch: false }
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}

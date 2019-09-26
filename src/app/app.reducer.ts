import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromInOut from './in-out/in-out.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // inOut: fromInOut.InOutState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    // inOut: fromInOut.InOutReducer
};

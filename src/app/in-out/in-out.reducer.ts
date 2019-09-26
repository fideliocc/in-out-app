import * as fromInOut from './in-out.actions';
import { InOut } from './in-out.model';
import { AppState } from '../app.reducer';

export interface InOutState {
    items: InOut[];
}

export interface AppState extends AppState {
    inOut: InOutState;
}

const initState: InOutState = {
    items: []
};

export function InOutReducer(state = initState, action: fromInOut.actions): InOutState {
    switch (action.type) {
        case fromInOut.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            };

        case fromInOut.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}
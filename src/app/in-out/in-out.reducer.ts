import * as fromInOut from './in-out.actions';
import { InOut } from './in-out.model';

export interface InOutState {
    items: InOut[];
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
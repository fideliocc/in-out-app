import { Action } from '@ngrx/store';
import { InOut } from './in-out.model';

export const SET_ITEMS = '[In Out] Set Items';
export const UNSET_ITEMS = '[In Out] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: InOut[]) {}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsAction |
                      UnsetItemsAction;

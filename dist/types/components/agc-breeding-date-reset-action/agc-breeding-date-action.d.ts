import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class AgcBreedingDateAction {
    socket: string;
    action: 'reset' | 'move';
    actionText: string;
    agcAction: EventEmitter;
    render(): JSX.Element;
    doAction(e: UIEvent): void;
}

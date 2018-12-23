import '../../stencil.core';
export declare class AgcBreedingDateActions {
    socket: string;
    tract: string;
    results: any;
    render(): JSX.Element;
    agcCalculatedHandler(event: CustomEvent): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
}

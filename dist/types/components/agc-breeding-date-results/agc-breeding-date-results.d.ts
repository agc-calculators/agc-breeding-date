import '../../stencil.core';
export declare class AgcBreedingDateResults {
    socket: string;
    data: any;
    ready: boolean;
    render(): JSX.Element;
    handleResults(e: CustomEvent): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
}

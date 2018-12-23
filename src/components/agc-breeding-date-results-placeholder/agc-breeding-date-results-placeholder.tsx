import { Component } from '@stencil/core';


@Component({
    tag: 'agc-breeding-date-results-placeholder',
    styleUrl: 'agc-breeding-date-results-placeholder.css'
})
export class AgcBreedingDateResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.breeding-date">Breeding Date</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.days-until-calving">Days until Breeding</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.first-partition-begins">First Partition Begins</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.second-partition-begins">Second Partition Begins</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.third-partition-begins">Third Partition Begins</h2>
                        {placeholder()}
                    </li>                    
                </ul>
            </section>
        );
    }
}

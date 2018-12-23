export class AgcBreedingDateResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.breeding-date" }, "Breeding Date"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.days-until-calving" }, "Days until Breeding"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.first-partition-begins" }, "First Partition Begins"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.second-partition-begins" }, "Second Partition Begins"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.third-partition-begins" }, "Third Partition Begins"),
                    placeholder()))));
    }
    static get is() { return "agc-breeding-date-results-placeholder"; }
    static get style() { return "/**style-placeholder:agc-breeding-date-results-placeholder:**/"; }
}

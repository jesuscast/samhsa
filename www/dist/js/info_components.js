"use strict";

var all_data = {
    info: {
        drugs: {
            methadone: {
                side_effects: [{ text: "Experience difficulty breathing or shallow breathing", image: "" }, { text: "Feel lightheaded or faint", image: "./dist/images/faint.png" }, { text: "Feel chest pain", image: "./dist/images/chest_pain.png" }, { text: "Experience a fast or pounding heartbeat", image: "./dist/images/heart.png" }, { text: "Experience hives or a rash; swelling of the face, lips, tongue, or throat", image: "./dist/images/hives.png" }, { text: "Experience hallucinations or confusion", image: "./dist/images/confusion.png" }],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Never use combination with alvimopan, itraconazole, ketoconazole, rasagiline, selegiline',
                'pic_address': 'dist/images/methadone.jpg'
            },
            buprenorphine: {
                side_effects: [{ text: "Nausea, vomiting, and constipation", image: './dist/images/vomiting.png' }, { text: "Muscle aches and cramps", image: './dist/images/body_pain.png' }, { text: "Cravings", image: '' }, { text: "Inability to sleep", image: './dist/images/awake.png' }, { text: "Distress and irritability", image: './dist/images/headache.png' }, { text: "Fever", image: './dist/images/fever.png' }],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/images/buprenorphine.jpg'
            },
            naltrexone: {
                side_effects: [{ text: "Headache", image: './dist/images/headache.png' }, { text: "Diarrhea", image: './dist/images/diarrhea.png' }, { text: "Upset stomach or vomiting", image: './dist/images/vomiting.png' }, { text: "Sleep problems/tiredness", image: './dist/images/awake.png' }, { text: "Nervousness", image: '' }, { text: "Joint or muscle pain", image: './dist/images/body_pain.png' }],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/images/naltrexone.jpg'
            }
        }
    },
    support: '',
    social: ''
};

/*

License for icons:
https://icons8.com/license/
*/
var SpecificDrugScreen = React.createClass({
    displayName: "SpecificDrugScreen",

    render: function render() {
        return React.createElement(
            "div",
            { className: "content", id: "specific_drug" },
            React.createElement(
                "section",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement("i", { onClick: this.toS, className: "fa fa-chevron-circle-left fa-2x" }),
                    " Common Searchsddes"
                ),
                React.createElement(
                    "article",
                    null,
                    React.createElement(
                        "h1",
                        { className: "warning" },
                        " Warning!! "
                    )
                ),
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        { onClick: this.toNP },
                        React.createElement("img", { src: "dist/50.png" }),
                        React.createElement(
                            "span",
                            null,
                            "1Abasdcair Sulfate (Ziagen)"
                        )
                    )
                ),
                React.createElement("div", { className: "clear" })
            )
        );
    }
});
var DrugScreen = React.createClass({
    displayName: "DrugScreen",

    getInitialState: function getInitialState() {
        return {
            screen: "main_screen"
        };
    },
    changeState: function changeState(screen_name) {
        this.setState({ screen: screen_name });
    },
    render: function render() {
        switch (this.state.screen) {
            case "main_screen":
                return React.createElement(
                    "div",
                    { className: "content", id: "specific_drug" },
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "header",
                            null,
                            React.createElement(
                                "div",
                                { className: "back_btn" },
                                React.createElement("i", { onClick: this.props.goBack, className: "fa fa-chevron-circle-left fa-2x" })
                            ),
                            "Common Searches"
                        ),
                        React.createElement(
                            "article",
                            { className: "drug_article" },
                            React.createElement(
                                "h1",
                                { className: "drug_name" },
                                this.props.drugName
                            ),
                            React.createElement(
                                "div",
                                { className: "warning" },
                                React.createElement(
                                    "h1",
                                    null,
                                    " Warning!! "
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    this.props.drugInfo.warning
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "big_btn", onClick: this.changeState.bind(this, "side_effects") },
                                "Side Effects"
                            ),
                            React.createElement(
                                "div",
                                { className: "big_btn", onClick: this.changeState.bind(this, "interactions") },
                                "Interactions with Other Drugs"
                            ),
                            React.createElement("p", null)
                        ),
                        React.createElement("div", { className: "clear" })
                    )
                );
                break;
            case "side_effects":
                var side_effects = [];
                for (var i = 0; i < this.props.drugInfo.side_effects.length; i++) {
                    side_effects.push(React.createElement(
                        "li",
                        null,
                        React.createElement("img", { src: this.props.drugInfo.side_effects[i].image }),
                        this.props.drugInfo.side_effects[i].text
                    ));
                }
                return React.createElement(
                    "div",
                    { className: "content", id: "specific_drug" },
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "header",
                            null,
                            React.createElement(
                                "div",
                                { className: "back_btn" },
                                React.createElement("i", { onClick: this.changeState.bind(this, "main_screen"), className: "fa fa-chevron-circle-left fa-2x" })
                            ),
                            React.createElement(
                                "b",
                                null,
                                this.props.drugName
                            )
                        ),
                        React.createElement(
                            "article",
                            { className: "drug_article" },
                            React.createElement(
                                "h1",
                                { className: "drug_name" },
                                "Side Effects"
                            )
                        ),
                        React.createElement(
                            "ul",
                            null,
                            side_effects,
                            React.createElement("div", { className: "clear" })
                        ),
                        React.createElement("div", { className: "clear" })
                    )
                );
                break;
            case "interactions":
                var interactions = [];
                var o_k = Object.keys(this.props.drugInfo.interactions);
                for (var _i = 0; _i < o_k.length; _i++) {
                    interactions.push(React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "b",
                            null,
                            o_k[_i]
                        ),
                        this.props.drugInfo.interactions[o_k[_i]]
                    ));
                }
                window.interactions = this.props.drugInfo.interactions;
                return React.createElement(
                    "div",
                    { className: "content", id: "specific_drug" },
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "header",
                            null,
                            React.createElement(
                                "div",
                                { className: "back_btn" },
                                React.createElement("i", { onClick: this.changeState.bind(this, "main_screen"), className: "fa fa-chevron-circle-left fa-2x" })
                            ),
                            React.createElement(
                                "b",
                                null,
                                this.props.drugName
                            )
                        ),
                        React.createElement(
                            "article",
                            { className: "drug_article" },
                            React.createElement(
                                "h1",
                                { className: "drug_name" },
                                "Interactions"
                            )
                        ),
                        React.createElement(
                            "ul",
                            null,
                            interactions
                        ),
                        React.createElement("div", { className: "clear" })
                    )
                );
                break;
            default:
                return React.createElement(
                    "h1",
                    null,
                    " Main Screen "
                );
        }
    }
});

exports.InfoScreen = React.createClass({
    displayName: "InfoScreen",

    getInitialState: function getInitialState() {
        return {
            screen: "main_screen",
            data: all_data.info,
            current_drug: ""
        };
    },
    goToSpecificDrug: function goToSpecificDrug(drug_name) {
        this.setState({
            screen: "specific_drug",
            current_drug: drug_name
        });
    },
    goBack: function goBack(screen_name) {
        this.setState({
            screen: screen_name
        });
    },
    render: function render() {
        var list_elements = [];
        var o_k = Object.keys(this.state.data.drugs);
        for (var i = 0; i < o_k.length; i++) {
            list_elements.push(React.createElement(
                "li",
                { onClick: this.goToSpecificDrug.bind(this, o_k[i]) },
                React.createElement("img", { src: this.state.data.drugs[o_k[i]].pic_address }),
                React.createElement(
                    "span",
                    null,
                    o_k[i]
                )
            ));
        }
        switch (this.state.screen) {
            case "main_screen":
                return React.createElement(
                    "div",
                    { className: "content" },
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "header",
                            null,
                            React.createElement(
                                "b",
                                null,
                                "Information"
                            )
                        ),
                        React.createElement(
                            "ul",
                            null,
                            list_elements,
                            React.createElement("div", { className: "clear" })
                        ),
                        React.createElement("div", { className: "clear" })
                    )
                );
                break;
            case "specific_drug":
                return React.createElement(DrugScreen, { drugName: this.state.current_drug, goBack: this.goBack.bind(this, "main_screen"), drugInfo: this.state.data.drugs[this.state.current_drug] });
                break;
            default:
                console.log("This is the default screen sso kill me now");
                return React.createElement(
                    "h1",
                    null,
                    " Default screen 1"
                );
        } // end of switch
    } // end of render
}); // end of infoscreen
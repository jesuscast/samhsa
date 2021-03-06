"use strict";

var emergency = require('./emergency.js');
var all_data = {
    info: {
        drugs: {
            methadone: {
                side_effects: [{ text_s: "Experience difficulty breathing or shallow breathing", image: "" }, { text_s: "Feel lightheaded or faint", image: "./dist/images/faint.png" }, { text_s: "Feel chest pain", image: "./dist/images/chest_pain.png" }, { text_s: "Experience a fast or pounding heartbeat", image: "./dist/images/heart.png" }, { text_s: "Experience hallucinations or confusion", image: "./dist/images/confusion.png" }, { text_s: "Experience hives or a rash; swelling of the face, lips, tongue, or throat", image: "./dist/images/hives.png" }],
                interactions: {
                    'Fights against methadone, causing withdrawal symptoms.': 'Buprenorphine (Buprenex®), butorphanol (Stadol®), dezocine (Dalgan®), nalbuphine (Nubain®), pentazocine (Talwin®), and tramadol (Ultram®)',
                    'May decrease methadone levels.': 'St. Johns wort or large amounts of vitamin C',
                    'Can make the usual methadone dose feel too weak': 'Cocaine abuse or chronic use of alcoho',
                    'Decrease in breathing ability and blood pressure as well as death.': 'Methadone, Buprenorphine, or Naltrexone with Benzodiazepines , Benzodiazepine Analogs or Barbiturates.'
                },
                warning: ["Never use combination with alvimopan, itraconazole, ketoconazole, rasagiline, selegiline."],
                'pic_address': 'dist/images/methadone.jpg',
                text: ["Talk to your doctor about eating grapefruit and drinking grapefruit juice while taking this medicine", "Do not take a double dose to make up for a missed one", "Methadone comes as a tablet, a dispersible (can be dissolved in liquid) tablet , a solution (liquid), and a concentrated solution to take by mouth."]
            },
            buprenorphine: {
                side_effects: [{ text_s: "Nausea, vomiting, and constipation", image: './dist/images/vomiting.png' }, { text_s: "Muscle aches and cramps", image: './dist/images/body_pain.png' }, { text_s: "Cravings", image: '' }, { text_s: "Inability to sleep", image: './dist/images/awake.png' }, { text_s: "Distress and irritability", image: './dist/images/headache.png' }, { text_s: "Fever", image: './dist/images/fever.png' }],
                interactions: {
                    'Decrease in breathing ability and blood pressure as well as death.': 'Methadone, Buprenorphine, or Naltrexone with Benzodiazepines , Benzodiazepine Analogs or Barbiturates.',
                    'Can add to the breathing difficulties that can be caused by this medication.': 'Alcohol'
                },
                warning: ["Alcohol can add to the breathing difficulties that can be caused by this medication."],
                'pic_address': 'dist/images/buprenorphine.jpg',
                text: ["Do not stop taking or using buprenorphine or buprenorphine and naloxone without talking to your doctor.", "Do not take or apply a double dose to make up for a missed one.", "Place the tablets under your tongue until they completely melt.", "Do not eat, drink, or talk until the tablet dissolves completely.", "Do not chew the tablets or swallow them whole."]
            },
            naltrexone: {
                side_effects: [{ text_s: "Headache", image: './dist/images/headache.png' }, { text_s: "Diarrhea", image: './dist/images/diarrhea.png' }, { text_s: "Upset stomach or vomiting", image: './dist/images/vomiting.png' }, { text_s: "Sleep problems/tiredness", image: './dist/images/awake.png' }, { text_s: "Nervousness", image: '' }, { text_s: "Joint or muscle pain", image: './dist/images/body_pain.png' }],
                interactions: {
                    'Decrease in breathing ability and blood pressure as well as death.': 'Methadone, Buprenorphine, or Naltrexone with Benzodiazepines , Benzodiazepine Analogs or Barbiturates.',
                    'carboxymethylcellulose or PLG': ''
                },
                warning: ["Naltrexone blocks a high from opiods. DO NOT take large amounts of opioids to try to overcome this! You could DIE!", "Liver injury: Naltrexone may cause liver injury.", "Allergic pneumonia: It may cause an allergic pneumonia. "],
                'pic_address': 'dist/images/naltrexone.jpg',
                text: ["Naltrexone injection comes as a solution (liquid) to be given by injection into the muscle of the buttocks by a healthcare provider once every 4 weeks.", "Naltrexone injection will not prevent withdrawal symptoms that may occur when you stop drinking alcohol after drinking large amounts for a long time or when you stop using opiate medications or street drugs."]
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
                    React.createElement(emergency.Emergency, null)
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
                var text_inside = [];
                for (var i = 0; i < this.props.drugInfo.text.length; i++) {
                    text_inside.push(React.createElement(
                        "li",
                        null,
                        this.props.drugInfo.text[i]
                    ));
                }
                var warning_inside = [];
                for (var _i = 0; _i < this.props.drugInfo.warning.length; _i++) {
                    warning_inside.push(React.createElement(
                        "li",
                        null,
                        this.props.drugInfo.warning[_i]
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
                                React.createElement("i", { onClick: this.props.goBack, className: "fa fa-chevron-circle-left fa-2x" })
                            ),
                            React.createElement(emergency.Emergency, null)
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
                                    "ul",
                                    { className: "regular_list" },
                                    warning_inside
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
                            React.createElement(
                                "div",
                                { className: "top_m last_element" },
                                "Things to know",
                                React.createElement(
                                    "ul",
                                    { className: "regular_list" },
                                    text_inside
                                )
                            )
                        ),
                        React.createElement("div", { className: "clear" })
                    )
                );
                break;
            case "side_effects":
                var side_effects = [];
                for (var _i2 = 0; _i2 < this.props.drugInfo.side_effects.length; _i2++) {
                    side_effects.push(React.createElement(
                        "li",
                        null,
                        React.createElement("img", { src: this.props.drugInfo.side_effects[_i2].image }),
                        this.props.drugInfo.side_effects[_i2].text_s
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
                            ),
                            React.createElement(emergency.Emergency, null)
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
                for (var _i3 = 0; _i3 < o_k.length; _i3++) {
                    interactions.push(React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "b",
                            null,
                            o_k[_i3]
                        ),
                        this.props.drugInfo.interactions[o_k[_i3]]
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
                            ),
                            React.createElement(emergency.Emergency, null)
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
                            ),
                            React.createElement(emergency.Emergency, null)
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
                                "ul",
                                { className: "regular_list" },
                                React.createElement(
                                    "li",
                                    null,
                                    "In case of overdose, call your local poison control center at 1-800-222-1222"
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    "If the victim has collapsed or is not breathing, call local emergency services at 911"
                                )
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
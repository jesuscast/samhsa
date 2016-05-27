const emergency = require('./emergency.js');
let all_data = {
    info: {
        drugs: {
            methadone: {
                side_effects: [
                    {text_s: "Experience difficulty breathing or shallow breathing", image: ""},
                    {text_s: "Feel lightheaded or faint", image: "./dist/images/faint.png"},
                    {text_s: "Feel chest pain", image: "./dist/images/chest_pain.png"},
                    {text_s: "Experience a fast or pounding heartbeat", image: "./dist/images/heart.png"},
                    {text_s: "Experience hallucinations or confusion", image: "./dist/images/confusion.png"},
                     {text_s: "Experience hives or a rash; swelling of the face, lips, tongue, or throat", image: "./dist/images/hives.png"},
                ],
                interactions: {
                    'Fights against methadone, causing withdrawal symptoms.': 'Buprenorphine (Buprenex®), butorphanol (Stadol®), dezocine (Dalgan®), nalbuphine (Nubain®), pentazocine (Talwin®), and tramadol (Ultram®)',
                    'May decrease methadone levels.' : 'St. Johns wort or large amounts of vitamin C',
                    'Can make the usual methadone dose feel too weak': 'Cocaine abuse or chronic use of alcoho',
                    'Decrease in breathing ability and blood pressure as well as death.': 'Methadone, Buprenorphine, or Naltrexone with Benzodiazepines , Benzodiazepine Analogs or Barbiturates.'
                },
                warning: [
                    "Never use combination with alvimopan, itraconazole, ketoconazole, rasagiline, selegiline.",
                ],
                'pic_address': 'dist/images/methadone.jpg',
                text: [
                    "Talk to your doctor about eating grapefruit and drinking grapefruit juice while taking this medicine",
                    "Do not take a double dose to make up for a missed one",
                    "Methadone comes as a tablet, a dispersible (can be dissolved in liquid) tablet , a solution (liquid), and a concentrated solution to take by mouth."
                ],
            },
            buprenorphine: {
                side_effects: [
                    {text_s: "Nausea, vomiting, and constipation", image: './dist/images/vomiting.png'},
                    {text_s: "Muscle aches and cramps", image: './dist/images/body_pain.png'},
                    {text_s: "Cravings", image: ''},
                    {text_s: "Inability to sleep", image: './dist/images/awake.png'},
                    {text_s: "Distress and irritability", image: './dist/images/headache.png'},
                    {text_s: "Fever", image: './dist/images/fever.png'},
                ],
                interactions: {
                    'Decrease in breathing ability and blood pressure as well as death.': 'Methadone, Buprenorphine, or Naltrexone with Benzodiazepines , Benzodiazepine Analogs or Barbiturates.',
                    'Can add to the breathing difficulties that can be caused by this medication.': 'Alcohol'
                },
                warning: [
                    "Alcohol can add to the breathing difficulties that can be caused by this medication."
                ],
                'pic_address': 'dist/images/buprenorphine.jpg',
                text: [
                    "Do not stop taking or using buprenorphine or buprenorphine and naloxone without talking to your doctor.",
                    "Do not take or apply a double dose to make up for a missed one.", 
                    "Place the tablets under your tongue until they completely melt.",
                    "Do not eat, drink, or talk until the tablet dissolves completely.",
                    "Do not chew the tablets or swallow them whole."
                ],
            },
            naltrexone: {
                side_effects:  [
                    {text_s: "Headache", image: './dist/images/headache.png'},
                    {text_s: "Diarrhea", image: './dist/images/diarrhea.png'},
                    {text_s: "Upset stomach or vomiting", image: './dist/images/vomiting.png'},
                    {text_s: "Sleep problems/tiredness", image: './dist/images/awake.png'},
                    {text_s: "Nervousness", image: ''},
                    {text_s: "Joint or muscle pain", image: './dist/images/body_pain.png' }
                ],
                interactions: {
                   'Decrease in breathing ability and blood pressure as well as death.': 'Methadone, Buprenorphine, or Naltrexone with Benzodiazepines , Benzodiazepine Analogs or Barbiturates.',
                   'carboxymethylcellulose or PLG':''
                },
                warning: [
                    "Naltrexone blocks a high from opiods. DO NOT take large amounts of opioids to try to overcome this! You could DIE!",
                    "Liver injury: Naltrexone may cause liver injury.",
                    "Allergic pneumonia: It may cause an allergic pneumonia. "
                ],
                'pic_address': 'dist/images/naltrexone.jpg',
                text: [
                    "Naltrexone injection comes as a solution (liquid) to be given by injection into the muscle of the buttocks by a healthcare provider once every 4 weeks.",
                    "Naltrexone injection will not prevent withdrawal symptoms that may occur when you stop drinking alcohol after drinking large amounts for a long time or when you stop using opiate medications or street drugs."
                ],
            },
        },
    },
    support: '',
    social: ''
};

/*

License for icons:
https://icons8.com/license/
*/
let SpecificDrugScreen = React.createClass({
    render: function(){
        return (
            <div className="content" id="specific_drug">
                <section>
                    <header>
                    <i  onClick={ this.toS } className="fa fa-chevron-circle-left fa-2x"></i> Common Searchsddes
                     <emergency.Emergency />
                    </header>
                    <article>
                        <h1 className="warning"> Warning!! </h1>
                    </article>
                    <ul>
                        <li onClick={ this.toNP }><img src="dist/50.png"></img><span>1Abasdcair Sulfate (Ziagen)</span></li>
                    </ul>
                    <div className="clear"></div>
                </section>
            </div>
        );
    }
});
let DrugScreen = React.createClass({
    getInitialState: function(){
        return {
            screen: "main_screen"
        };
    },
    changeState: function(screen_name){
        this.setState({ screen: screen_name });
    },
    render: function(){
        switch(this.state.screen){
            case "main_screen":
                let text_inside = [];
                for(let i = 0; i < this.props.drugInfo.text.length; i++){
                    text_inside.push(<li>{ this.props.drugInfo.text[i] }</li>);
                }
                let warning_inside = [];
                for(let i = 0; i < this.props.drugInfo.warning.length; i++){
                    warning_inside.push(<li>{ this.props.drugInfo.warning[i] }</li>);
                }
                return (
                     <div className="content" id="specific_drug">
                        <section>
                            <header>
                            <div className="back_btn"><i  onClick={ this.props.goBack } className="fa fa-chevron-circle-left fa-2x"></i></div>Common Searches
                             <emergency.Emergency />
                            </header>
                            <article className="drug_article">
                                <h1 className="drug_name">{ this.props.drugName }</h1>
                                <div className="warning">
                                    <h1> Warning!! </h1>
                                    <ul className="regular_list">
                                        { warning_inside }
                                    </ul>
                                </div>
                                <div className="big_btn" onClick={ this.changeState.bind(this, "side_effects") }>Side Effects</div>
                                <div className="big_btn" onClick={ this.changeState.bind(this, "interactions") }>Interactions with Other Drugs</div>
                                <div className="top_m last_element">
                                    Things to know
                                    <ul className="regular_list">
                                        { text_inside }
                                    </ul>
                                </div>
                            </article>
                            <div className="clear"></div>
                        </section>
                    </div>
                );
                break;
            case "side_effects":
                let side_effects = [];
                for(let i = 0; i < this.props.drugInfo.side_effects.length; i++){
                    side_effects.push(<li><img src={this.props.drugInfo.side_effects[i].image} />{this.props.drugInfo.side_effects[i].text_s}</li>);
                }
                return(
                     <div className="content" id="specific_drug">
                        <section>
                            <header>
                            <div className="back_btn"><i  onClick={ this.changeState.bind(this, "main_screen") } className="fa fa-chevron-circle-left fa-2x"></i></div><b>{ this.props.drugName }</b>
                             <emergency.Emergency />
                            </header>
                            <article className="drug_article">
                                <h1 className="drug_name">Side Effects</h1>
                            </article>
                            <ul>
                                { side_effects }
                                <div className="clear"></div>
                            </ul>
                            <div className="clear"></div>
                        </section>
                    </div>
                );
                break;
            case "interactions":
                let interactions = [];
                let o_k = Object.keys(this.props.drugInfo.interactions);
                for(let i = 0; i < o_k.length; i++){
                    interactions.push(<li><b>{ o_k[i] }</b>{this.props.drugInfo.interactions[o_k[i]]}</li>);
                }
                window.interactions = this.props.drugInfo.interactions;
                return(
                     <div className="content" id="specific_drug">
                        <section>
                            <header>
                            <div className="back_btn"><i  onClick={ this.changeState.bind(this, "main_screen") } className="fa fa-chevron-circle-left fa-2x"></i></div><b>{ this.props.drugName }</b>
                             <emergency.Emergency />
                            </header>
                            <article className="drug_article">
                                <h1 className="drug_name">Interactions</h1>
                            </article>
                            <ul>
                                { interactions }
                            </ul>
                            <div className="clear"></div>
                        </section>
                    </div>
                );
                break;
            default:
                return (<h1> Main Screen </h1>);
        }
    }
});

exports.InfoScreen = React.createClass({
    getInitialState: function(){
       return {
            screen: "main_screen",
            data: all_data.info,
            current_drug: "",
       }; 
    },
    goToSpecificDrug: function(drug_name){
        this.setState({
            screen: "specific_drug",
            current_drug: drug_name
        });
    },
    goBack: function(screen_name){
        this.setState({
            screen: screen_name
        });
    },
    render: function(){
        let list_elements = [];
        let o_k = Object.keys(this.state.data.drugs);
        for(let i = 0; i < o_k.length; i++) {
            list_elements.push(<li onClick={ this.goToSpecificDrug.bind(this, o_k[i]) }><img src={ this.state.data.drugs[o_k[i]].pic_address }></img><span>{o_k[i]}</span></li>);
        }
        switch(this.state.screen) {
            case "main_screen":
                return(
                    <div className="content">
                        <section>
                            <header>
                                <b>Information</b>
                                 <emergency.Emergency />
                            </header>
                            <div className="warning">
                                    <h1> Warning!! </h1>
                                    <ul className="regular_list">
                                        <li>In case of overdose, call your local poison control center at 1-800-222-1222</li>
                                        <li>If the victim has collapsed or is not breathing, call local emergency services at 911</li>
                                    </ul>
                                </div>
                            <ul>
                                { list_elements }
                                <div className="clear"></div>
                            </ul>
                            <div className="clear"></div>
                        </section>
                    </div>
                );
                break;
            case "specific_drug":
                return (
                    <DrugScreen drugName = {this.state.current_drug} goBack={ this.goBack.bind(this, "main_screen") } drugInfo={this.state.data.drugs[this.state.current_drug]} />
                );
                break;
            default:
                console.log("This is the default screen sso kill me now");
                return (<h1> Default screen 1</h1>);
        } // end of switch
    } // end of render
}); // end of infoscreen
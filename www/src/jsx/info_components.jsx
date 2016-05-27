let all_data = {
    info: {
        drugs: {
            methadone: {
                side_effects: [
                    {text: "Experience difficulty breathing or shallow breathing", image: ""},
                    {text: "Feel lightheaded or faint", image: "./dist/images/faint.png"},
                    {text: "Feel chest pain", image: "./dist/images/chest_pain.png"},
                    {text: "Experience a fast or pounding heartbeat", image: "./dist/images/heart.png"},
                    {text: "Experience hives or a rash; swelling of the face, lips, tongue, or throat", image: "./dist/images/hives.png"},
                    
                    {text: "Experience hallucinations or confusion", image: "./dist/images/confusion.png"}
                ],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Never use combination with alvimopan, itraconazole, ketoconazole, rasagiline, selegiline',
                'pic_address': 'dist/images/methadone.jpg',
            },
            buprenorphine: {
                side_effects: [
                    {text: "Nausea, vomiting, and constipation", image: './dist/images/vomiting.png'},
                    {text: "Muscle aches and cramps", image: './dist/images/body_pain.png'},
                    {text: "Cravings", image: ''},
                    {text: "Inability to sleep", image: './dist/images/awake.png'},
                    {text: "Distress and irritability", image: './dist/images/headache.png'},
                    {text: "Fever", image: './dist/images/fever.png'},
                ],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/images/buprenorphine.jpg',
            },
            naltrexone: {
                side_effects:  [
                    {text: "Headache", image: './dist/images/headache.png'},
                    {text: "Diarrhea", image: './dist/images/diarrhea.png'},
                    {text: "Upset stomach or vomiting", image: './dist/images/vomiting.png'},
                    {text: "Sleep problems/tiredness", image: './dist/images/awake.png'},
                    {text: "Nervousness", image: ''},
                    {text: "Joint or muscle pain", image: './dist/images/body_pain.png' }
                ],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/images/naltrexone.jpg',
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
                return (
                     <div className="content" id="specific_drug">
                        <section>
                            <header>
                            <div className="back_btn"><i  onClick={ this.props.goBack } className="fa fa-chevron-circle-left fa-2x"></i></div>Common Searches
                            </header>
                            <article className="drug_article">
                                <h1 className="drug_name">{ this.props.drugName }</h1>
                                <div className="warning">
                                    <h1> Warning!! </h1>
                                    <p>
                                    { this.props.drugInfo.warning }
                                    </p>
                                </div>
                                <div className="big_btn" onClick={ this.changeState.bind(this, "side_effects") }>Side Effects</div>
                                <div className="big_btn" onClick={ this.changeState.bind(this, "interactions") }>Interactions with Other Drugs</div>
                                <p>
                                </p>
                            </article>
                            <div className="clear"></div>
                        </section>
                    </div>
                );
                break;
            case "side_effects":
                let side_effects = [];
                for(let i = 0; i < this.props.drugInfo.side_effects.length; i++){
                    side_effects.push(<li><img src={this.props.drugInfo.side_effects[i].image} />{this.props.drugInfo.side_effects[i].text}</li>);
                }
                return(
                     <div className="content" id="specific_drug">
                        <section>
                            <header>
                            <div className="back_btn"><i  onClick={ this.changeState.bind(this, "main_screen") } className="fa fa-chevron-circle-left fa-2x"></i></div><b>{ this.props.drugName }</b>
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
                            </header>
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
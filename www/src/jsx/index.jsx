let test_in_cordova = false;


let all_data = {
    info: {
        drugs: {
            methadone: {
                side_effects: [
                    'this is my side effect 1',
                    'this is my second side effect'
                ],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/50.png',
            },
            buprenorphine: {
                side_effects: [
                    'this is my side effect 1',
                    'this is my second side effect'
                ],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/50.png',
            },
            naltrexone: {
                side_effects: [
                    'this is my side effect 1',
                    'this is my second side effect'
                ],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/50.png',
            },
        },
    },
    support: '',
    social: ''
};
/*

https://gist.github.com/amolk/1599412

Remove rubberband scrolling from web apps on mobile safari (iOS)

*/
// document.body.addEventListener('touchmove', function(event) {
//   console.log(event.source);
//   //if (event.source == document.body)
//     event.preventDefault();
// }, false);

// window.onresize = function() {
//   $(document.body).width(window.innerWidth).height(window.innerHeight);
// }

// $(function() {
//   window.onresize();
// });


// var myScroll;
// function loaded() {
//     myScroll = new iScroll('wrapper');
// }
// document.addEventListener('DOMContentLoaded', loaded, false);


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


let SpecificDrugScreen = React.createClass({
    render: function(){
        return (
            <div className="content" id="specific_drug">
                <section>
                    <header>
                    <i  onClick={ this.toS } className="fa fa-chevron-circle-left fa-lg"></i> Common Searchsddes
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
                            <div className="back_btn"><i  onClick={ this.props.goBack } className="fa fa-chevron-circle-left fa-lg"></i></div>Common Searches
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
                    side_effects.push(<li>{this.props.drugInfo.side_effects[i]}</li>);
                }
                return(
                     <div className="content" id="specific_drug">
                        <section>
                            <header>
                            <div className="back_btn"><i  onClick={ this.changeState.bind(this, "main_screen") } className="fa fa-chevron-circle-left fa-lg"></i></div><b>{ this.props.drugName }</b>
                            </header>
                            <article className="drug_article">
                                <h1 className="drug_name">Side Effects</h1>
                            </article>
                            <ul>
                                { side_effects }
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
                            <div className="back_btn"><i  onClick={ this.changeState.bind(this, "main_screen") } className="fa fa-chevron-circle-left fa-lg"></i></div><b>{ this.props.drugName }</b>
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

let InfoScreen = React.createClass({
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
                        <div className="search_bar">
                            <span>Find Substance Information</span>
                            <input type="text"></input>
                        </div>
                        <section>
                            <header>
                            Common Searches
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

let FooterSection = React.createClass({
    render: function(){
        return (
            <footer>
                <ul>
                    <li onClick={this.props.onClick.bind(this, 'info')}><span>Info</span><i className="fa fa-thumb-tack fa-lg"></i></li>
                    <li onClick={this.props.onClick.bind(this, 'support')}><span>Support</span><i className="fa fa-star fa-lg"></i></li>
                    <li onClick={this.props.onClick.bind(this, 'social')}><span>Social</span><i className="fa fa-group fa-lg"></i></li>
                </ul>
            </footer>
        );
    }
});

let SupportScreen = React.createClass({
    render:  function(){
        return (
            <h1>This is the support Screen </h1>
        );
    }
});

let SocialScreen = React.createClass({
    render:  function(){
        return (
            <h1>This is the social Screen </h1>
        );
    }
});

let App = React.createClass({
    getInitialState: function(){
        /*
            Really terrible implementation of checking for constant values for my state machine.

            Possible states:
                'home'
        */
        return {
            screen: 'info'
        };
    },
    changeState: function(future_state){
        this.setState({ screen: future_state });
    },
    render: function() {
        switch(this.state.screen){
            case 'info':
                return (
                <div>
                    <InfoScreen />
                    <FooterSection onClick={this.changeState} />
                </div>);
                break;
            case 'support':
                return(
                <div>
                    <SupportScreen />
                    <FooterSection onClick={this.changeState} />
                </div>);
                break;
            case "social":
                return(
                <div>
                    <SocialScreen />
                    <FooterSection onClick={this.changeState} />
                </div>);
                break;
            default:
                return(<h1>sdasd</h1>);
        }
    }
});


 React.render(
            <App />,
           document.getElementById('master'));

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        React.render(
            <App />,
           document.getElementById('master'));
    }
};


if(test_in_cordova)
    app.initialize();


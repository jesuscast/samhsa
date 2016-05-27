let test_in_cordova = false;

const social_manager = require('./social_components.js');
const support_manager = require('./support_components.js');
const info_manager = require('./info_components.js');

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

let FooterSection = React.createClass({
    render: function(){
        let info_selected = "";
        let support_selected = "";
        let social_selected = "";
        console.log(this.props.screenSelected);
        if(this.props.screenSelected == "info")
           { info_selected = "selected";}
        else if(this.props.screenSelected == "support")
            {support_selected = "selected";}
        else
            {social_selected = "selected";}
        return (
            <footer>
                <ul>
                    <li onClick={this.props.onClick.bind(this, 'info')}><span>Info</span><i className={"fa fa-info fa-2x "+info_selected}></i></li>
                    <li onClick={this.props.onClick.bind(this, 'support')}><span>Support</span><i className={"fa fa-star fa-2x "+support_selected}></i></li>
                    <li onClick={this.props.onClick.bind(this, 'social')}><span>Social</span><i className={"fa fa-group fa-2x "+social_selected}></i></li>
                </ul>
            </footer>
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
                    <info_manager.InfoScreen />
                    <FooterSection onClick={this.changeState} screenSelected = { this.state.screen } />
                </div>);
                break;
            case 'support':
                return(
                <div>
                    <support_manager.SupportScreen />
                    <FooterSection onClick={this.changeState} screenSelected = { this.state.screen } />
                </div>);
                break;
            case "social":
                return(
                <div>
                    <social_manager.SocialScreen />
                    <FooterSection onClick={this.changeState} screenSelected = { this.state.screen } />
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


'use strict';

var test_in_cordova = false;

var social_manager = require('./social_components.js');
var support_manager = require('./support_components.js');
var info_manager = require('./info_components.js');

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
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

var FooterSection = React.createClass({
    displayName: 'FooterSection',

    render: function render() {
        var info_selected = "";
        var support_selected = "";
        var social_selected = "";
        console.log(this.props.screenSelected);
        if (this.props.screenSelected == "info") {
            info_selected = "selected";
        } else if (this.props.screenSelected == "support") {
            support_selected = "selected";
        } else {
            social_selected = "selected";
        }
        return React.createElement(
            'footer',
            null,
            React.createElement(
                'ul',
                null,
                React.createElement(
                    'li',
                    { onClick: this.props.onClick.bind(this, 'info') },
                    React.createElement(
                        'span',
                        null,
                        'Info'
                    ),
                    React.createElement('i', { className: "fa fa-info fa-2x " + info_selected })
                ),
                React.createElement(
                    'li',
                    { onClick: this.props.onClick.bind(this, 'support') },
                    React.createElement(
                        'span',
                        null,
                        'Support'
                    ),
                    React.createElement('i', { className: "fa fa-star fa-2x " + support_selected })
                ),
                React.createElement(
                    'li',
                    { onClick: this.props.onClick.bind(this, 'social') },
                    React.createElement(
                        'span',
                        null,
                        'Social'
                    ),
                    React.createElement('i', { className: "fa fa-group fa-2x " + social_selected })
                )
            )
        );
    }
});

var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
        /*
            Really terrible implementation of checking for constant values for my state machine.
             Possible states:
                'home'
        */
        return {
            screen: 'info'
        };
    },
    changeState: function changeState(future_state) {
        this.setState({ screen: future_state });
    },
    render: function render() {
        switch (this.state.screen) {
            case 'info':
                return React.createElement(
                    'div',
                    null,
                    React.createElement(info_manager.InfoScreen, null),
                    React.createElement(FooterSection, { onClick: this.changeState, screenSelected: this.state.screen })
                );
                break;
            case 'support':
                return React.createElement(
                    'div',
                    null,
                    React.createElement(support_manager.SupportScreen, null),
                    React.createElement(FooterSection, { onClick: this.changeState, screenSelected: this.state.screen })
                );
                break;
            case "social":
                return React.createElement(
                    'div',
                    null,
                    React.createElement(social_manager.SocialScreen, null),
                    React.createElement(FooterSection, { onClick: this.changeState, screenSelected: this.state.screen })
                );
                break;
            default:
                return React.createElement(
                    'h1',
                    null,
                    'sdasd'
                );
        }
    }
});

React.render(React.createElement(App, null), document.getElementById('master'));

var app = {
    // Application Constructor
    initialize: function initialize() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function onDeviceReady() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function receivedEvent(id) {

        React.render(React.createElement(App, null), document.getElementById('master'));
    }
};

if (test_in_cordova) app.initialize();
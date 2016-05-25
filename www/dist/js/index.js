'use strict';

var test_in_cordova = false;

/*

https://gist.github.com/amolk/1599412

Remove rubberband scrolling from web apps on mobile safari (iOS)

*/
document.body.addEventListener('touchmove', function (event) {
    console.log(event.source);
    //if (event.source == document.body)
    event.preventDefault();
}, false);

window.onresize = function () {
    $(document.body).width(window.innerWidth).height(window.innerHeight);
};

$(function () {
    window.onresize();
});

// var myScroll;
// function loaded() {
//     myScroll = new iScroll('wrapper');
// }
// document.addEventListener('DOMContentLoaded', loaded, false);

var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
        return {};
    },
    chaCha: function chaCha(asd) {
        alert(asd);
    },
    componentDidMount: function componentDidMount() {
        setTimeout(function () {
            var myScroll = new iScroll('wrapper', { 'bounce': false });
        }, 400);
        var a = 12;
    },
    render: function render() {
        var self = this;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: 'wrapper', className: 'scrollable content' },
                React.createElement(
                    'div',
                    { id: 'no_wrap' },
                    React.createElement(
                        'div',
                        { className: 'search_bar' },
                        React.createElement(
                            'span',
                            null,
                            'Find Substance Information'
                        ),
                        React.createElement('input', { type: 'text' })
                    ),
                    React.createElement(
                        'section',
                        null,
                        React.createElement(
                            'header',
                            null,
                            'Common Searches'
                        ),
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '1Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '2Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '3Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '4Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '5Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '6Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '7Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '8Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '9Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '10Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '11Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '12Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '13Abacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    'A14bacavir Sulfate (Ziagen)'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement('img', { src: 'dist/50.png' }),
                                React.createElement(
                                    'span',
                                    null,
                                    '15Abacavir Sulfate (Ziagen)'
                                )
                            )
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                )
            ),
            React.createElement(
                'footer',
                null,
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        { onClick: self.chaCha.bind(self, "Hey") },
                        React.createElement(
                            'span',
                            null,
                            'Info'
                        ),
                        React.createElement('i', { className: 'fa fa-thumb-tack fa-lg' })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'span',
                            null,
                            'Support'
                        ),
                        React.createElement('i', { className: 'fa fa-star fa-lg' })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'span',
                            null,
                            'Social'
                        ),
                        React.createElement('i', { className: 'fa fa-group fa-lg' })
                    )
                )
            )
        );
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
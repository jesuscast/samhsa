'use strict';

var test_in_cordova = false;

var all_data = {
    info: {
        drugs: {
            methadone: {
                side_effects: ['this is my side effect 1', 'this is my second side effect'],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/50.png'
            },
            buprenorphine: {
                side_effects: ['this is my side effect 1', 'this is my second side effect'],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/50.png'
            },
            naltrexone: {
                side_effects: ['this is my side effect 1', 'this is my second side effect'],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/50.png'
            }
        }
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
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

var SpecificDrugScreen = React.createClass({
    displayName: 'SpecificDrugScreen',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'content', id: 'specific_drug' },
            React.createElement(
                'section',
                null,
                React.createElement(
                    'header',
                    null,
                    React.createElement('i', { onClick: this.toS, className: 'fa fa-chevron-circle-left fa-lg' }),
                    ' Common Searchsddes'
                ),
                React.createElement(
                    'article',
                    null,
                    React.createElement(
                        'h1',
                        { className: 'warning' },
                        ' Warning!! '
                    )
                ),
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        { onClick: this.toNP },
                        React.createElement('img', { src: 'dist/50.png' }),
                        React.createElement(
                            'span',
                            null,
                            '1Abasdcair Sulfate (Ziagen)'
                        )
                    )
                ),
                React.createElement('div', { className: 'clear' })
            )
        );
    }
});
var DrugScreen = React.createClass({
    displayName: 'DrugScreen',

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
                    'div',
                    { className: 'content', id: 'specific_drug' },
                    React.createElement(
                        'section',
                        null,
                        React.createElement(
                            'header',
                            null,
                            React.createElement(
                                'div',
                                { className: 'back_btn' },
                                React.createElement('i', { onClick: this.props.goBack, className: 'fa fa-chevron-circle-left fa-lg' })
                            ),
                            'Common Searches'
                        ),
                        React.createElement(
                            'article',
                            { className: 'drug_article' },
                            React.createElement(
                                'h1',
                                { className: 'drug_name' },
                                this.props.drugName
                            ),
                            React.createElement(
                                'div',
                                { className: 'warning' },
                                React.createElement(
                                    'h1',
                                    null,
                                    ' Warning!! '
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    this.props.drugInfo.warning
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'big_btn', onClick: this.changeState.bind(this, "side_effects") },
                                'Side Effects'
                            ),
                            React.createElement(
                                'div',
                                { className: 'big_btn', onClick: this.changeState.bind(this, "interactions") },
                                'Interactions with Other Drugs'
                            ),
                            React.createElement('p', null)
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                );
                break;
            case "side_effects":
                var side_effects = [];
                for (var i = 0; i < this.props.drugInfo.side_effects.length; i++) {
                    side_effects.push(React.createElement(
                        'li',
                        null,
                        this.props.drugInfo.side_effects[i]
                    ));
                }
                return React.createElement(
                    'div',
                    { className: 'content', id: 'specific_drug' },
                    React.createElement(
                        'section',
                        null,
                        React.createElement(
                            'header',
                            null,
                            React.createElement(
                                'div',
                                { className: 'back_btn' },
                                React.createElement('i', { onClick: this.changeState.bind(this, "main_screen"), className: 'fa fa-chevron-circle-left fa-lg' })
                            ),
                            React.createElement(
                                'b',
                                null,
                                this.props.drugName
                            )
                        ),
                        React.createElement(
                            'article',
                            { className: 'drug_article' },
                            React.createElement(
                                'h1',
                                { className: 'drug_name' },
                                'Side Effects'
                            )
                        ),
                        React.createElement(
                            'ul',
                            null,
                            side_effects
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                );
                break;
            case "interactions":
                var interactions = [];
                var o_k = Object.keys(this.props.drugInfo.interactions);
                for (var _i = 0; _i < o_k.length; _i++) {
                    interactions.push(React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'b',
                            null,
                            o_k[_i]
                        ),
                        this.props.drugInfo.interactions[o_k[_i]]
                    ));
                }
                window.interactions = this.props.drugInfo.interactions;
                return React.createElement(
                    'div',
                    { className: 'content', id: 'specific_drug' },
                    React.createElement(
                        'section',
                        null,
                        React.createElement(
                            'header',
                            null,
                            React.createElement(
                                'div',
                                { className: 'back_btn' },
                                React.createElement('i', { onClick: this.changeState.bind(this, "main_screen"), className: 'fa fa-chevron-circle-left fa-lg' })
                            ),
                            React.createElement(
                                'b',
                                null,
                                this.props.drugName
                            )
                        ),
                        React.createElement(
                            'article',
                            { className: 'drug_article' },
                            React.createElement(
                                'h1',
                                { className: 'drug_name' },
                                'Interactions'
                            )
                        ),
                        React.createElement(
                            'ul',
                            null,
                            interactions
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                );
                break;
            default:
                return React.createElement(
                    'h1',
                    null,
                    ' Main Screen '
                );
        }
    }
});

var InfoScreen = React.createClass({
    displayName: 'InfoScreen',

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
                'li',
                { onClick: this.goToSpecificDrug.bind(this, o_k[i]) },
                React.createElement('img', { src: this.state.data.drugs[o_k[i]].pic_address }),
                React.createElement(
                    'span',
                    null,
                    o_k[i]
                )
            ));
        }
        switch (this.state.screen) {
            case "main_screen":
                return React.createElement(
                    'div',
                    { className: 'content' },
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
                            list_elements,
                            React.createElement('div', { className: 'clear' })
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                );
                break;
            case "specific_drug":
                return React.createElement(DrugScreen, { drugName: this.state.current_drug, goBack: this.goBack.bind(this, "main_screen"), drugInfo: this.state.data.drugs[this.state.current_drug] });
                break;
            default:
                console.log("This is the default screen sso kill me now");
                return React.createElement(
                    'h1',
                    null,
                    ' Default screen 1'
                );
        } // end of switch
    } // end of render
}); // end of infoscreen

var FooterSection = React.createClass({
    displayName: 'FooterSection',

    render: function render() {
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
                    React.createElement('i', { className: 'fa fa-thumb-tack fa-lg' })
                ),
                React.createElement(
                    'li',
                    { onClick: this.props.onClick.bind(this, 'support') },
                    React.createElement(
                        'span',
                        null,
                        'Support'
                    ),
                    React.createElement('i', { className: 'fa fa-star fa-lg' })
                ),
                React.createElement(
                    'li',
                    { onClick: this.props.onClick.bind(this, 'social') },
                    React.createElement(
                        'span',
                        null,
                        'Social'
                    ),
                    React.createElement('i', { className: 'fa fa-group fa-lg' })
                )
            )
        );
    }
});

var SupportScreen = React.createClass({
    displayName: 'SupportScreen',

    render: function render() {
        return React.createElement(
            'h1',
            null,
            'This is the support Screen '
        );
    }
});

var SocialScreen = React.createClass({
    displayName: 'SocialScreen',

    render: function render() {
        return React.createElement(
            'h1',
            null,
            'This is the social Screen '
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
                    React.createElement(InfoScreen, null),
                    React.createElement(FooterSection, { onClick: this.changeState })
                );
                break;
            case 'support':
                return React.createElement(
                    'div',
                    null,
                    React.createElement(SupportScreen, null),
                    React.createElement(FooterSection, { onClick: this.changeState })
                );
                break;
            case "social":
                return React.createElement(
                    'div',
                    null,
                    React.createElement(SocialScreen, null),
                    React.createElement(FooterSection, { onClick: this.changeState })
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
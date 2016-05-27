(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
                    React.createElement('i', { className: "fa fa-thumb-tack fa-2x " + info_selected })
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
},{"./info_components.js":2,"./social_components.js":3,"./support_components.js":4}],2:[function(require,module,exports){
'use strict';

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
                'pic_address': 'dist/images/methadone.jpg'
            },
            buprenorphine: {
                side_effects: ['this is my side effect 1', 'this is my second side effect'],
                interactions: {
                    'other_drug': 'data',
                    'drug_x': 'data'
                },
                warning: 'Super important warning',
                'pic_address': 'dist/images/buprenorphine.jpg'
            },
            naltrexone: {
                side_effects: ['this is my side effect 1', 'this is my second side effect'],
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
                    React.createElement('i', { onClick: this.toS, className: 'fa fa-chevron-circle-left fa-2x' }),
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
                                React.createElement('i', { onClick: this.props.goBack, className: 'fa fa-chevron-circle-left fa-2x' })
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
                                React.createElement('i', { onClick: this.changeState.bind(this, "main_screen"), className: 'fa fa-chevron-circle-left fa-2x' })
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
                                React.createElement('i', { onClick: this.changeState.bind(this, "main_screen"), className: 'fa fa-chevron-circle-left fa-2x' })
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

exports.InfoScreen = React.createClass({
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
                        'section',
                        null,
                        React.createElement(
                            'header',
                            null,
                            React.createElement(
                                'b',
                                null,
                                'Information'
                            )
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
},{}],3:[function(require,module,exports){
"use strict";

exports.SocialScreen = React.createClass({
    displayName: "SocialScreen",

    render: function render() {
        return React.createElement(
            "h1",
            null,
            "This is the social Screen "
        );
    }
});
},{}],4:[function(require,module,exports){
'use strict';

window.geocoder;

var meetings_url = 'https://samhsa-ebdef.firebaseio.com/data/';

var getCookie = function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
var csrfSafeMethod = function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
    );
};

var guid = function guid() {
    var s4 = function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var LocationComponent = React.createClass({
    displayName: 'LocationComponent',

    getInitialState: function getInitialState() {
        return {
            lat: 0,
            long: 0,
            location_name: '',
            screen_name: 'loading'
        };
    },
    onSuccess: function onSuccess(position) {
        var self = this;
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address;
                    var value = add.split(",");

                    var count = value.length;
                    window.dead = results;
                    var country = value[count - 1];
                    var state = value[count - 2];
                    var city = value[count - 3];
                    var long_state_name = results[0].address_components[5].long_name;
                    self.setState({
                        screen_name: "main_screen",
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        location_name: city + ', ' + state
                    });
                    self.props.onLocationLoaded(position.coords.latitude, position.coords.longitude, city + ', ' + state, long_state_name);
                } else {
                    alert("address not found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        } // end of inline function.
        );
    },
    onError: function onError() {
        var self = this;
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    },
    componentDidMount: function componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    changeState: function changeState(screen_name) {
        this.setState({ screen_name: screen_name });
    },
    render: function render() {
        switch (this.state.screen_name) {
            case "loading":
                return React.createElement(
                    'h1',
                    { className: 'drug_name' },
                    'Loading Location...'
                );
                break;
            case "main_screen":
                return React.createElement(
                    'div',
                    { className: 'your_location', onClick: this.changeState.bind(this, "change_location") },
                    React.createElement(
                        'span',
                        null,
                        'Closest to ',
                        React.createElement('i', { className: 'fa fa-location-arrow fa-lg' }),
                        ' ',
                        this.state.location_name
                    )
                );
                break;
            case "change_location":
                return React.createElement(
                    'div',
                    { className: 'your_location', onClick: this.changeState.bind(this, "change_location") },
                    React.createElement(
                        'span',
                        null,
                        'Change Location:'
                    ),
                    React.createElement('input', { type: 'text' })
                );
                break;
            default:
                return React.createElement(
                    'b',
                    null,
                    'Error'
                );
        }
    }
});

var MapView = React.createClass({
    displayName: 'MapView',

    getInitialState: function getInitialState() {
        return {
            screen: "main_screen",
            mapId: guid()
        };
    },
    changeState: function changeState(screen_name) {
        this.setState({ screen: screen_name });
    },
    componentDidMount: function componentDidMount() {
        console.log('Yes');
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.state.screen == "view_map") {
            var position = { lat: this.props.dataLat, lng: this.props.dataLong };
            var map = new google.maps.Map(document.getElementById(this.state.mapId), {
                center: position,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                heading: 90,
                tilt: 45
            });
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: 'Map'
            });
        } else {
            alert('NO');
        }
    },
    render: function render() {
        switch (this.state.screen) {
            case "main_screen":
                if (this.props.dataLat != Infinity && this.props.dataLong != Infinity && this.props.dataLat != 'n/a' && this.props.dataLong != 'n/a') {
                    return React.createElement(
                        'sub',
                        { onClick: this.changeState.bind(this, 'view_map') },
                        React.createElement('i', { className: 'fa fa-map-marker fa-lg' }),
                        'View Map'
                    );
                } else {
                    return React.createElement('b', null);
                }
                break;
            case "view_map":
                var coords_string = this.props.dataLat + ", " + this.props.dataLong;
                return React.createElement(
                    'div',
                    { className: 'map_container' },
                    React.createElement('div', { className: 'map', id: this.state.mapId }),
                    React.createElement(
                        'a',
                        { href: "comgooglemaps://?q=" + coords_string + "&center=" + coords_string + " &zoom=17" },
                        'Open in Google Maps'
                    )
                );
            default:
                return React.createElement(
                    'h1',
                    null,
                    'Error'
                );
        } // end switch
    }
});
var MeetingsList = React.createClass({
    displayName: 'MeetingsList',

    render: function render() {
        var items_jsx = [];
        console.log(this.props.itemsData);
        for (var i = 0; i < this.props.itemsData.length; i++) {
            items_jsx.push(React.createElement(
                'li',
                null,
                React.createElement(
                    'span',
                    { className: 'title_event' },
                    this.props.itemsData[i].name
                ),
                React.createElement(
                    'b',
                    null,
                    'When'
                ),
                React.createElement(
                    'span',
                    null,
                    this.props.itemsData[i].day + ', ' + this.props.itemsData[i].time
                ),
                React.createElement('br', null),
                React.createElement(
                    'b',
                    null,
                    'Where'
                ),
                React.createElement(
                    'span',
                    null,
                    this.props.itemsData[i].location
                ),
                React.createElement(MapView, { dataLat: this.props.itemsData[i].latitude, dataLong: this.props.itemsData[i].longitude }),
                React.createElement(
                    'b',
                    null,
                    'Contact:'
                ),
                React.createElement(
                    'span',
                    null,
                    this.props.itemsData[i].contact
                ),
                React.createElement('br', null)
            ));
        }
        return React.createElement(
            'ul',
            { className: 'events' },
            items_jsx,
            React.createElement('div', { className: 'clear' })
        );
    }
});

var distance_calculator = function distance_calculator(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

exports.SupportScreen = React.createClass({
    displayName: 'SupportScreen',

    getInitialState: function getInitialState() {
        return {
            screen: "loading",
            lat: 0,
            long: 0,
            location_name: "",
            long_state_name: "",
            items: []
        };
    },
    changeState: function changeState(screen_name) {
        this.setState({ screen: screen_name });
    },
    onLocationLoaded: function onLocationLoaded(latitude, longitude, location_name, long_state_name) {
        // alert('Outside in support screen');
        this.setState({
            lat: latitude,
            long: longitude,
            location_name: location_name,
            long_state_name: long_state_name
        });
        this.findMeetings();
    },
    findMeetings: function findMeetings() {
        var self = this;
        if (this.state.long_state_name != '') {
            $.ajax({
                async: true,
                url: meetings_url + '/' + this.state.long_state_name + '/.json',
                method: 'GET',
                dataType: 'json',
                complete: function complete(data) {
                    var data_r = data.responseJSON;
                    var o_k = Object.keys(data_r);
                    var tmp = [];
                    for (var i = 0; i < o_k.length; i++) {
                        var o_k_i = Object.keys(data_r[o_k[i]]);
                        for (var j = 0; j < o_k_i.length; j++) {
                            tmp.push(data_r[o_k[i]][o_k_i[j]]);
                        }
                    }
                    var distances = [];
                    for (var _i = 0; _i < tmp.length; _i++) {
                        if (tmp[_i].latitude != 'n/a' && tmp[_i].longitude != 'n/a') {
                            distances.push(distance_calculator(tmp[_i].latitude, tmp[_i].longitude, self.state.lat, self.state.long));
                        } else {
                            distances.push(Infinity);
                        }
                    }
                    var needs_sorting = true;
                    while (needs_sorting == true) {
                        needs_sorting = false;
                        for (var _i2 = 0; _i2 < distances.length - 1; _i2++) {
                            if (distances[_i2] > distances[_i2 + 1]) {
                                var tmp_d = distances[_i2];
                                distances[_i2] = distances[_i2 + 1];
                                distances[_i2 + 1] = tmp_d;
                                var tmp_h = tmp[_i2];
                                tmp[_i2] = tmp[_i2 + 1];
                                tmp[_i2 + 1] = tmp_h;
                                needs_sorting = true; //
                            }
                        }
                    }
                    self.setState({ items: tmp });
                },
                beforeSend: function beforeSend(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
        } else {
            console.log('asdasd');
        }
    },
    render: function render() {
        switch (this.state.screen) {
            case "loading":
                return React.createElement(
                    'div',
                    { className: 'content support_component', id: 'specific_drug' },
                    React.createElement(
                        'section',
                        null,
                        React.createElement(
                            'header',
                            null,
                            React.createElement(
                                'b',
                                null,
                                'support'
                            )
                        ),
                        React.createElement(
                            'article',
                            { className: 'drug_article' },
                            React.createElement(
                                'h1',
                                { className: 'drug_name' },
                                'Meetings'
                            ),
                            React.createElement(LocationComponent, { onLocationLoaded: this.onLocationLoaded }),
                            React.createElement(MeetingsList, { itemsData: this.state.items })
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                );
            default:
                return React.createElement(
                    'span',
                    null,
                    'sad'
                );
        } // end switch
    }
});
},{}]},{},[1]);

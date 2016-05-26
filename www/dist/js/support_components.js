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
                    ),
                    React.createElement(
                        'sub',
                        null,
                        'Click to Change'
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
                React.createElement('br', null),
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
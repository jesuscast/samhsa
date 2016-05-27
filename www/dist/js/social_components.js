'use strict';

var emergency = require('./emergency.js');
var csrfSafeMethod = function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
    );
};
var users_url = 'https://samhsa-ebdef.firebaseio.com/users/';

exports.SocialScreen = React.createClass({
    displayName: 'SocialScreen',

    getInitialState: function getInitialState() {
        return {
            data: {
                physician_name: '',
                physician_number: '',
                emergency_name: '',
                emergency_number: ''
            },
            iteration: 0
        };
    },
    componentDidMount: function componentDidMount() {
        var self = this;
        $.ajax({
            async: true,
            url: users_url + window.unique_id + '/.json',
            method: 'GET',
            dataType: 'json',
            complete: function complete(data) {
                window.test_me = data;
                if (data.responseJSON != null) {
                    var j = data.responseJSON;
                    window.k = j;
                    self.setState({
                        data: {
                            physician_name: j.physician_name,
                            physician_number: j.physician_number,
                            emergency_name: j.emergency_name,
                            emergency_number: j.emergency_number
                        },
                        iteration: self.state.iteration + 1
                    });
                    $("#physician_name").val(j.physician_name);
                    $("#physician_number").val(j.physician_number);
                    $("#emergency_name").val(j.emergency_name);
                    $("#emergency_number").val(j.emergency_number);
                    localStorage.setItem('physician_number', j.physician_number);
                    localStorage.setItem('physician_name', j.physician_name);
                    localStorage.setItem('emergency_number', j.emergency_number);
                    localStorage.setItem('emergency_name', j.emergency_name);
                }
            },
            beforeSend: function beforeSend(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
    },
    saveData: function saveData() {
        var _this = this;

        var physician_name = $("#physician_name").val();
        var physician_number = $("#physician_number").val();
        var emergency_name = $("#emergency_name").val();
        var emergency_number = $("#emergency_number").val();
        console.log(physician_number + ' ' + physician_name + ' ' + emergency_number + ' ' + emergency_name);
        if (physician_name != '' && physician_number != '' && emergency_number != '' && emergency_name != '') {
            (function () {
                var data_to_send = {
                    "physician_name": physician_name,
                    "physician_number": physician_number,
                    "emergency_name": emergency_name,
                    "emergency_number": emergency_number
                };
                window.sendingMe = data_to_send;
                var self = _this;
                $.ajax({
                    async: true,
                    url: users_url + window.unique_id + '/.json',
                    method: 'PATCH',
                    dataType: 'json',
                    data: JSON.stringify(data_to_send),
                    complete: function complete(result) {
                        console.log(result);
                        self.setState({ data: data_to_send, iteration: self.state.iteration + 1 });
                        alert('Saved!');
                        localStorage.setItem('physician_number', data_to_send.physician_number);
                        localStorage.setItem('physician_name', data_to_send.physician_name);
                        localStorage.setItem('emergency_number', data_to_send.emergency_number);
                        localStorage.setItem('emergency_name', data_to_send.emergency_name);
                    },
                    beforeSend: function beforeSend(xhr, settings) {
                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    }
                });
            })();
        } else {
            console.log('One or more values needs to be filled');
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'content full' },
            React.createElement(
                'section',
                null,
                React.createElement(
                    'header',
                    null,
                    React.createElement(
                        'b',
                        null,
                        'My Profile'
                    ),
                    React.createElement(emergency.Emergency, null)
                ),
                React.createElement(
                    'article',
                    { className: 'drug_article' },
                    React.createElement(
                        'h1',
                        { className: 'drug_name' },
                        'My Physician'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'data_fields' },
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'label',
                                null,
                                'Name: '
                            ),
                            ' ',
                            React.createElement('input', { id: 'physician_name', type: 'text', defaultValue: this.state.data.physician_name })
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'label',
                                null,
                                'Number: '
                            ),
                            React.createElement('input', { id: 'physician_number', type: 'text', pattern: '\\d*', defaultValue: this.state.data.physician_number })
                        ),
                        React.createElement('div', { className: 'clear' })
                    ),
                    React.createElement('div', { className: 'clear' })
                ),
                React.createElement(
                    'article',
                    { className: 'drug_article' },
                    React.createElement(
                        'h1',
                        { className: 'drug_name' },
                        'Emergency Contact'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'data_fields' },
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'label',
                                null,
                                'Name: '
                            ),
                            ' ',
                            React.createElement('input', { id: 'emergency_name', type: 'text', defaultValue: this.state.data.emergency_name })
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'label',
                                null,
                                'Number: '
                            ),
                            React.createElement('input', { id: 'emergency_number', type: 'text', pattern: '\\d*', defaultValue: this.state.data.emergency_number }),
                            ' '
                        ),
                        React.createElement('div', { className: 'clear' })
                    ),
                    React.createElement('div', { className: 'clear' })
                ),
                React.createElement(
                    'div',
                    { className: 'save big_btn last_element_i', onClick: this.saveData },
                    'Save'
                ),
                React.createElement('div', { className: 'clear' })
            )
        );
    }
});
"use strict";

exports.Emergency = React.createClass({
    displayName: "Emergency",

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
                    "span",
                    { className: "emergency", onClick: this.changeState.bind(this, 'alert') },
                    React.createElement("i", { className: "fa fa-warning fa-lg " }),
                    "Emergency"
                );
                break;
            case "alert":
                return React.createElement(
                    "div",
                    { className: "alert_emergency" },
                    React.createElement(
                        "div",
                        { className: "inner_c" },
                        React.createElement(
                            "div",
                            { className: "big_btn" },
                            "Call Emergency Contact"
                        ),
                        React.createElement(
                            "div",
                            { className: "big_btn" },
                            "Call Physician"
                        ),
                        React.createElement(
                            "div",
                            { className: "save big_btn close ", onClick: this.changeState.bind(this, 'main_screen') },
                            "Close"
                        )
                    ),
                    React.createElement("div", { className: "blur" })
                );
                break;
            default:
                return React.createElement(
                    "h1",
                    null,
                    "Error"
                );
        }
    }
});
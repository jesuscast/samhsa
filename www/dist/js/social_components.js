"use strict";

var emergency = require('./emergency.js');

exports.SocialScreen = React.createClass({
    displayName: "SocialScreen",

    render: function render() {
        return React.createElement(
            "div",
            { className: "content full" },
            React.createElement(
                "section",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "b",
                        null,
                        "My Profile"
                    ),
                    React.createElement(emergency.Emergency, null)
                ),
                React.createElement(
                    "article",
                    { className: "drug_article" },
                    React.createElement(
                        "h1",
                        { className: "drug_name" },
                        "My Physician"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "data_fields" },
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "label",
                                null,
                                "Name: "
                            ),
                            " ",
                            React.createElement("input", { type: "text" })
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "label",
                                null,
                                "Number: "
                            ),
                            React.createElement("input", { type: "text", pattern: "\\d*" })
                        ),
                        React.createElement("div", { className: "clear" })
                    ),
                    React.createElement("div", { className: "clear" })
                ),
                React.createElement(
                    "article",
                    { className: "drug_article" },
                    React.createElement(
                        "h1",
                        { className: "drug_name" },
                        "Emergency Contact"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "data_fields" },
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "label",
                                null,
                                "Name: "
                            ),
                            " ",
                            React.createElement("input", { type: "text" })
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "label",
                                null,
                                "Number: "
                            ),
                            React.createElement("input", { type: "text", pattern: "\\d*" }),
                            " "
                        ),
                        React.createElement("div", { className: "clear" })
                    ),
                    React.createElement("div", { className: "clear" })
                ),
                React.createElement(
                    "div",
                    { className: "save big_btn" },
                    "Save"
                ),
                React.createElement("div", { className: "clear" })
            )
        );
    }
});
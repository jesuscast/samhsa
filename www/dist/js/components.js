"use strict";

var db = new Firebase("https://grace-prez.firebaseio.com/ruf/");

var NavBar = React.createClass({
    displayName: "NavBar",


    getInitialState: function getInitialState() {
        return {
            screen: "home",
            visibility: "hidden"
        };
    },

    changeState: function changeState(menu_option) {
        // let bro = event.target.childNodes[1].innerHTML
        // window.wtff = event.target;
        // console.log(event.target);
        //alert();
        // let destination = bro.toLowerCase();
        // console.log(destination);
        // let base_url = window.location;
        // window.location.assign(base_url.toString().split(".html")[0] + ".html?" + destination)
        this.props.changeScreen(menu_option);
    },

    toggle: function toggle() {
        if (this.state.visibility == "hidden") {
            this.setState({ visibility: "show" });
            console.log("bro");
        } else {
            this.setState({ visibility: "hidden" });
            console.log("adf");
        }
        console.log(this.state.visibility);
    },

    render: function render() {
        if (this.state.visibility == "show") {
            var navList = ["HOME", "About", "Crew", "Events", "Podcast", "Contact"];
            var menu_options = ['home', 'about', 'crew', 'events', 'podcast', 'contact'];
            var bar = [];
            for (var i = 0; i < navList.length; i++) {
                var sizeOfBars = Math.round(12 / navList.length);
                var sizeOfSides = (12 - navList.length * sizeOfBars) / 2;
                bar.push(React.createElement(
                    "li",
                    { className: "nav-item col-md-2" },
                    React.createElement(
                        "button",
                        { className: "form-control", onClick: this.changeState.bind(this, menu_options[i]) },
                        " ",
                        navList[i],
                        " "
                    )
                ));
            };
            return React.createElement(
                "div",
                null,
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "nav",
                    { className: "nav nav-tabs navbar-static-top" },
                    React.createElement(
                        "button",
                        { className: "btn btn-default", onClick: this.toggle },
                        "MENU"
                    ),
                    React.createElement(
                        "ol",
                        { className: "list-unstyled" },
                        bar
                    )
                )
            );
        } else {
            return React.createElement(
                "div",
                null,
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    { className: "btn btn-default", onClick: this.toggle },
                    "MENU"
                )
            );
        }
    }
});

var getStuffFromFirebase = function getStuffFromFirebase(db_selected, state_name, component) {
    db.child(db_selected).on("value", function (snapshot) {
        var data = snapshot.val();
        console.log(data);
        var o_k = Object.keys(data);
        var items = [];
        for (var i = o_k.length - 1; i >= 0; i--) {
            items.push(data[o_k[i]]);
        }
        window.wtf = items;
        var tmp_state = {};
        tmp_state[state_name] = items;
        this.setState(tmp_state);
    }.bind(component));
};

var AnnouncementList = React.createClass({
    displayName: "AnnouncementList",


    getInitialState: function getInitialState() {
        return {
            announcements: []
        };
    },

    componentDidMount: function componentDidMount() {
        getStuffFromFirebase("announcements", "announcements", this);
    },

    render: function render() {
        var announcementListElements = [];
        for (var a in this.state.announcements) {
            var thisAnnouncement = this.state.announcements[a];
            announcementListElements.push(React.createElement(
                "div",
                { className: "col-md-4" },
                React.createElement(
                    "h3",
                    { className: "text-center" },
                    " ",
                    thisAnnouncement.name,
                    " "
                ),
                React.createElement(
                    "span",
                    null,
                    " ",
                    thisAnnouncement.date,
                    " "
                ),
                React.createElement(
                    "p",
                    null,
                    " ",
                    thisAnnouncement.description,
                    " "
                )
            ));
        }

        return React.createElement(
            "div",
            { className: "row" },
            announcementListElements
        );
    }
});

var Podcasts = React.createClass({
    displayName: "Podcasts",


    getInitialState: function getInitialState() {
        return {
            podcasts: []
        };
    },

    componentDidMount: function componentDidMount() {
        getStuffFromFirebase("podcasts", "podcasts", this);
    },

    render: function render() {
        var elements = [];
        for (var a in this.state.podcasts) {
            var thisAnnouncement = this.state.podcasts[a];
            console.log(thisAnnouncement);
            elements.push(React.createElement(
                "div",
                { className: "row" },
                React.createElement("div", { className: "col-md-4" }),
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                        "h3",
                        { className: "text-center" },
                        " ",
                        thisAnnouncement.name,
                        " "
                    ),
                    React.createElement(
                        "span",
                        null,
                        " ",
                        thisAnnouncement.date,
                        " "
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "audio",
                        { controls: true },
                        React.createElement("source", { src: thisAnnouncement.link })
                    ),
                    React.createElement(
                        "p",
                        null,
                        " ",
                        thisAnnouncement.description,
                        " "
                    )
                ),
                React.createElement("div", { className: "col-md-4" })
            ));
        }

        return React.createElement(
            "div",
            { className: "row" },
            elements
        );
    }
});

var Crew = React.createClass({
    displayName: "Crew",


    getInitialState: function getInitialState() {
        return {
            members: []
        };
    },

    componentDidMount: function componentDidMount() {
        getStuffFromFirebase("crew", "members", this);
    },

    render: function render() {
        var elements = [];
        for (var a in this.state.members) {
            var thisAnnouncement = this.state.members[a];
            console.log(thisAnnouncement);
            elements.push(React.createElement(
                "div",
                { className: "col-md-4" },
                React.createElement(
                    "h3",
                    { className: "text-center" },
                    " ",
                    thisAnnouncement.name,
                    " "
                ),
                React.createElement("img", { className: "img-rounded img-responsive", src: thisAnnouncement.image }),
                React.createElement(
                    "span",
                    null,
                    " ",
                    thisAnnouncement.position,
                    " "
                ),
                React.createElement(
                    "p",
                    null,
                    " ",
                    thisAnnouncement.description,
                    " "
                ),
                React.createElement(
                    "span",
                    null,
                    " ",
                    thisAnnouncement.phone,
                    " & ",
                    thisAnnouncement.email,
                    " "
                )
            ));
        }

        return React.createElement(
            "div",
            { className: "row" },
            elements
        );
    }
});

var Events = React.createClass({
    displayName: "Events",


    getInitialState: function getInitialState() {
        return {
            events: []
        };
    },

    componentDidMount: function componentDidMount() {
        getStuffFromFirebase("events", "events", this);
    },

    render: function render() {
        var elements = [];
        for (var a in this.state.events) {
            var thisAnnouncement = this.state.events[a];
            console.log(thisAnnouncement);
            elements.push(React.createElement(
                "div",
                { className: "row" },
                React.createElement("div", { className: "col-md-3" }),
                React.createElement(
                    "div",
                    { className: "col-md-6" },
                    React.createElement(
                        "h3",
                        { className: "text-center" },
                        " ",
                        thisAnnouncement.name,
                        " "
                    ),
                    React.createElement("img", { src: thisAnnouncement.image }),
                    React.createElement(
                        "span",
                        null,
                        " ",
                        thisAnnouncement.date,
                        " "
                    ),
                    React.createElement(
                        "p",
                        null,
                        " ",
                        thisAnnouncement.description,
                        " "
                    )
                ),
                React.createElement("div", { className: "col-md-3" })
            ));
        }

        return React.createElement(
            "div",
            { className: "row" },
            elements
        );
    }
});
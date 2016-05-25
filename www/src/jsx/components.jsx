let db = new Firebase("https://grace-prez.firebaseio.com/ruf/");

let NavBar = React.createClass({

    getInitialState: function(){
        return {
            screen: "home",
            visibility: "hidden",
        }
    },

    changeState: function(menu_option) {
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

    toggle: function() {
        if (this.state.visibility == "hidden") {
            this.setState({ visibility: "show" });
            console.log("bro");
        } else {
            this.setState({ visibility: "hidden" });
            console.log("adf");
        }
        console.log(this.state.visibility);
    },

    render: function() {
        if (this.state.visibility == "show") {
            let navList = ["HOME", "About", "Crew", "Events", "Podcast", "Contact"];
            let menu_options = ['home', 'about', 'crew', 'events', 'podcast', 'contact'];
            let bar = []
            for (let i = 0; i < navList.length; i++) {
                let sizeOfBars = Math.round(12 / navList.length)
                let sizeOfSides = (12 - (navList.length * sizeOfBars)) / 2; 
                bar.push(
                        <li className="nav-item col-md-2">
                            <button className="form-control" onClick={ this.changeState.bind(this, menu_options[i]) }> { navList[i] } </button>
                        </li>
                )
            };
            return(
                <div>
                    <br></br>
                    <br></br>
                    <nav className="nav nav-tabs navbar-static-top">
                        <button className="btn btn-default" onClick={ this.toggle}>MENU</button>
                        <ol className="list-unstyled">
                            { bar }
                        </ol>
                    </nav>
                </div>
            );
        } else {
            return (
                <div>
                    <br></br>
                    <br></br>
                    <button className="btn btn-default" onClick={ this.toggle}>MENU</button>
                </div>
            )
        }
    },
});

let getStuffFromFirebase = function(db_selected, state_name, component) {
    db.child(db_selected).on("value", function(snapshot) {
        let data = snapshot.val();
        console.log(data);
        let o_k = Object.keys(data);
        let items = [];
        for (let i = o_k.length - 1; i >= 0; i--) {
            items.push(data[o_k[i]]);
        }
        window.wtf = items;
        let tmp_state = {};
        tmp_state[state_name] = items;
        this.setState(tmp_state);
    }.bind(component));
};

let AnnouncementList = React.createClass({

    getInitialState: function() {
        return {
            announcements: []
        }
    },

    componentDidMount: function() {
        getStuffFromFirebase("announcements", "announcements", this )
    },

    render: function() {
        let announcementListElements = [];
        for (let a in this.state.announcements) {
            let thisAnnouncement = this.state.announcements[a];
            announcementListElements.push(
                <div className="col-md-4"> 
                    <h3 className="text-center"> { thisAnnouncement.name } </h3> 
                    <span> { thisAnnouncement.date } </span> 
                    <p> { thisAnnouncement.description } </p> 
                </div>
            );
        }

        return (
            <div className="row">
                { announcementListElements }
            </div>
        );
    },
});

let Podcasts = React.createClass({

    getInitialState: function() {
        return {
            podcasts: []
        }
    },

    componentDidMount: function() {
        getStuffFromFirebase("podcasts", "podcasts", this)
    },

    render: function() {
        let elements = [];
        for (let a in this.state.podcasts) {
            let thisAnnouncement = this.state.podcasts[a];
            console.log(thisAnnouncement);
            elements.push(
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4"> 
                        <h3 className="text-center"> { thisAnnouncement.name } </h3> 
                        <span> { thisAnnouncement.date } </span>
                        <br></br>
                        <audio controls>
                            <source src= { thisAnnouncement.link }></source>
                        </audio>
                        <p> { thisAnnouncement.description } </p> 
                    </div>
                    <div className="col-md-4"></div>
                </div>
            );
        }

        return (
            <div className="row">
                { elements }
            </div>
        );

    },
});

let Crew = React.createClass({

    getInitialState: function() {
        return {
            members: []
        }
    },

    componentDidMount: function() {
        getStuffFromFirebase("crew", "members", this)
    },

    render: function() {
        let elements = [];
        for (let a in this.state.members) {
            let thisAnnouncement = this.state.members[a];
            console.log(thisAnnouncement);
            elements.push(
                <div className="col-md-4"> 
                    <h3 className="text-center"> { thisAnnouncement.name } </h3> 
                    <img className="img-rounded img-responsive" src= { thisAnnouncement.image }></img>
                    <span> { thisAnnouncement.position } </span> 
                    <p> { thisAnnouncement.description } </p> 
                    <span> { thisAnnouncement.phone } & { thisAnnouncement.email } </span>
                </div>
            );
        }

        return (
            <div className="row">
                { elements }
            </div>
        );
    },
});

let Events = React.createClass({

    getInitialState: function() {
        return {
            events: []
        }
    },

    componentDidMount: function() {
        getStuffFromFirebase("events", "events", this);
    },

    render: function() {
        let elements = [];
        for (let a in this.state.events) {
            let thisAnnouncement = this.state.events[a];
            console.log(thisAnnouncement);
            elements.push(
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6"> 
                        <h3 className="text-center"> { thisAnnouncement.name } </h3> 
                        <img src= { thisAnnouncement.image }></img>
                        <span> { thisAnnouncement.date } </span> 
                        <p> { thisAnnouncement.description } </p>
                    </div
                    ><div className="col-md-3"></div>
                </div>
            ) 
        }

        return (
            <div className="row">
                { elements }
            </div>
        );
    },
});
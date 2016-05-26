window.geocoder;

let meetings_url = 'https://samhsa-ebdef.firebaseio.com/data/';

let getCookie = function(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
let csrfSafeMethod = function(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};


let LocationComponent = React.createClass({
    getInitialState: function(){
        return {
            lat: 0,
            long: 0,
            location_name: '',
            screen_name: 'loading'
        };
    },
    onSuccess: function(position){
         let self = this;
        let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode(
            {'latLng': latlng}, 
            (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            let add= results[0].formatted_address ;
                            let  value=add.split(",");

                            let count=value.length;
                            window.dead = results;
                            let country=value[count-1];
                            let state=value[count-2];
                            let city=value[count-3];
                            let long_state_name = results[0].address_components[5].long_name;
                            self.setState({
                                screen_name: "main_screen",
                                lat: position.coords.latitude,
                                long: position.coords.longitude,
                                location_name: city+', '+state
                            });
                            self.props.onLocationLoaded(position.coords.latitude, position.coords.longitude, city+', '+state, long_state_name);
                        }
                        else  {
                            alert("address not found");
                        }
                }
                 else {
                    alert("Geocoder failed due to: " + status);
                }
            } // end of inline function.
        );
    },
    onError: function(){
        let self = this;
        alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
    },
    componentDidMount: function(){
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    changeState: function(screen_name){
        this.setState({ screen_name: screen_name });
    },
    render: function() {
        switch (this.state.screen_name) {
            case "loading":
                return (<h1 className="drug_name">Loading Location...</h1>);
                break;
            case "main_screen":
                return (
                    <div className="your_location" onClick={ this.changeState.bind(this, "change_location") }>
                        <span>Closest to <i className="fa fa-location-arrow fa-lg"></i> { this.state.location_name }</span>
                        <sub>Click to Change</sub>
                    </div>
                );
                break;
            case "change_location":
                return (
                    <div className="your_location" onClick={ this.changeState.bind(this, "change_location") }>
                        <span>Change Location:</span>
                        <input type="text"></input>
                    </div>
                );
                break;
            default:
                return (<b>Error</b>);
        }
    }
});

let MeetingsList  = React.createClass({
    render: function(){
        let items_jsx = [];
        console.log(this.props.itemsData);
        for(let i = 0; i < this.props.itemsData.length; i++){
            items_jsx.push(
                <li>
                    <span className="title_event">{this.props.itemsData[i].name}</span>
                    <b>When</b><span>{ this.props.itemsData[i].day+', '+this.props.itemsData[i].time }</span><br />
                    <b>Where</b><span>{ this.props.itemsData[i].location }</span><br />
                    <b>Contact:</b><span>{ this.props.itemsData[i].contact }</span><br />
                </li>
            );
        }
        return (
            <ul className="events">
                { items_jsx }
                  <div className="clear"></div>
            </ul>
        );
    }
});

exports.SupportScreen = React.createClass({
    getInitialState: function(){
        return {
            screen: "loading",
            lat: 0,
            long: 0,
            location_name: "",
            long_state_name: "",
            items: []
        };
    },
    changeState: function(screen_name){
        this.setState({ screen: screen_name });
    },
    onLocationLoaded: function(latitude, longitude, location_name, long_state_name){
        // alert('Outside in support screen');
        this.setState({
            lat: latitude,
            long: longitude,
            location_name: location_name,
            long_state_name: long_state_name
        });
        this.findMeetings();
    },
    findMeetings: function(){
        let self = this;
        if(this.state.long_state_name != ''){
            $.ajax({
                async: true,
                url: meetings_url+'/'+this.state.long_state_name+'/.json',
                method: 'GET',
                dataType: 'json',
                complete: function(data){
                    let data_r =  data.responseJSON;
                    let o_k = Object.keys(data_r);
                    let tmp = []
                    for(let i = 0 ; i < o_k.length ; i++) {
                        let o_k_i = Object.keys(data_r[o_k[i]]);
                        for(let j = 0 ; j < o_k_i.length; j ++) {
                            tmp.push(data_r[o_k[i]][o_k_i[j]]);
                        }
                    }
                    self.setState({ items: tmp });
                },
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
        } else {
            console.log('asdasd');
        }
    },
    render:  function(){
        switch (this.state.screen){
            case "loading":
                return (
                     <div className="content support_component" id="specific_drug">
                        <section>
                            <header>
                            <b>support</b>
                            </header>
                            <article className="drug_article">
                                <h1 className="drug_name">Meetings</h1>
                                <LocationComponent onLocationLoaded = { this.onLocationLoaded } />
                                <MeetingsList itemsData = {this.state.items} />
                            </article>
                            <div className="clear"></div>
                        </section>
                    </div>
                );
            default:
                return (<span>sad</span>);
       }// end switch
    }
});
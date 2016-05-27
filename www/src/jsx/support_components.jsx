window.geocoder;
const emergency = require('./emergency.js');
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

let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
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
                            let long_state_name = "";
                            console.log(state);
                            console.log(city);
                            for(let i = 0; i < results[0].address_components.length; i++){
                                if(results[0].address_components[i].types[0]=='administrative_area_level_1'){
                                    long_state_name = results[0].address_components[i].long_name;
                                    console.log(long_state_name);
                                    break;
                                }
                            }
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
                        { /*<sub>Click to Change.</sub>*/ }
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

let MapView = React.createClass({
    getInitialState: function(){
        return {
            screen: "main_screen",
            mapId: guid()
        };
    },
    changeState: function(screen_name){
        this.setState({ screen: screen_name });
    },
    componentDidMount: function(){
        console.log('Yes');
    },
    componentDidUpdate: function(){
        if(this.state.screen == "view_map") {
            let position = { lat: this.props.dataLat, lng: this.props.dataLong }
            let map = new google.maps.Map(document.getElementById(this.state.mapId), {
                center: position,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                heading: 90,
                tilt: 45
              });
             let marker = new google.maps.Marker({
                position: position,
                map: map,
                title: 'Map'
              });
        } else {
            // alert('NO');
        }
    },
    render: function(){
        switch(this.state.screen){
            case "main_screen":
                if(this.props.dataLat != Infinity && this.props.dataLong != Infinity && this.props.dataLat != 'n/a' && this.props.dataLong != 'n/a' ){
                    return (
                        <sub onClick={this.changeState.bind(this, 'view_map')}><i className="fa fa-map-marker fa-lg"></i>View Map</sub>
                    );
                }
                else {
                    return (<b></b>);
                }
                break; 
            case "view_map":
                let coords_string =  this.props.dataLat + ", " + this.props.dataLong;
                return (<div className="map_container">
                    <div className="map" id={ this.state.mapId }></div>
                    <a href={"comgooglemaps://?q="+coords_string+"&center=" +coords_string +" &zoom=17"}>Open in Google Maps</a>
                    </div>);
            default:
                return (<h1>Error</h1>);
        } // end switch
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
                    <b>Where</b><span>{ this.props.itemsData[i].location }</span>
                    <MapView dataLat = { this.props.itemsData[i].latitude } dataLong = { this.props.itemsData[i].longitude }/>
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

let distance_calculator = (lat1, lon1, lat2, lon2) => {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
      c(lat1 * p) * c(lat2 * p) * 
      (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};


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
                url: meetings_url+this.state.long_state_name+'/.json',
                method: 'GET',
                dataType: 'json',
                complete: function(data){
                    window.test_me = data;
                    let data_r =  data.responseJSON;
                    let o_k = Object.keys(data_r);
                    let tmp = [];
                    for(let i = 0 ; i < o_k.length ; i++) {
                        let o_k_i = Object.keys(data_r[o_k[i]]);
                        for(let j = 0 ; j < o_k_i.length; j ++) {
                            tmp.push(data_r[o_k[i]][o_k_i[j]]);
                        }
                    }
                    let distances = [];
                    for(let i = 0; i < tmp.length; i++){
                        if(tmp[i].latitude != 'n/a' && tmp[i].longitude != 'n/a'){ 
                            distances.push(distance_calculator(tmp[i].latitude, tmp[i].longitude, self.state.lat, self.state.long));
                        } else {
                            distances.push(Infinity);
                        }
                    }
                    let needs_sorting = true;
                    while(needs_sorting == true){
                        needs_sorting = false;
                        for(let i = 0; i < (distances.length - 1); i++){
                            if(distances[i] > distances[i+1]) {
                                let tmp_d = distances[i];
                                distances[i] = distances[i+1];
                                distances[i+1] = tmp_d;
                                let tmp_h = tmp[i];
                                tmp[i] = tmp[i+1];
                                tmp[i+1] = tmp_h;
                                needs_sorting = true;//
                            }
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
                             <emergency.Emergency />
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
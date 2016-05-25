let test_in_cordova = false;

/*

https://gist.github.com/amolk/1599412

Remove rubberband scrolling from web apps on mobile safari (iOS)

*/
document.body.addEventListener('touchmove', function(event) {
  console.log(event.source);
  //if (event.source == document.body)
    event.preventDefault();
}, false);

window.onresize = function() {
  $(document.body).width(window.innerWidth).height(window.innerHeight);
}

$(function() {
  window.onresize();
});


var myScroll;
function loaded() {
    myScroll = new iScroll('wrapper');
}
document.addEventListener('DOMContentLoaded', loaded, false);



let App = React.createClass({
    getInitialState: function(){
        return {};
    },
    chaCha: function(asd){
        alert(asd);
    },
    render: function() {
        let self = this;
        return (
            <div>
            <div id="wrapper" className="scrollable content">
            <div className="dummy">
                <div className="search_bar">
                    <span>Find Substance Information</span>
                    <input type="text"></input>
                </div>
                <section>
                    <header>
                    Common Searches
                    </header>
                </section>
            </div>
            </div>
            <footer>
                <ul>
                    <li onClick={self.chaCha.bind(self, "Hey")}><span>Info</span><i className="fa fa-thumb-tack fa-lg"></i></li>
                    <li><span>Support</span><i className="fa fa-star fa-lg"></i></li>
                    <li><span>Social</span><i className="fa fa-group fa-lg"></i></li>
                </ul>
            </footer>
            </div>);
    }
});


 React.render(
            <App />,
           document.getElementById('master'));

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        React.render(
            <App />,
           document.getElementById('master'));
    }
};


if(test_in_cordova)
    app.initialize();


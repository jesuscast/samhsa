exports.Emergency = React.createClass({
    getInitialState: function(){
        return {
            screen: "main_screen"
        }
    },
    changeState: function(screen_name) {
        this.setState({ screen: screen_name });
    },
    render: function(){
        switch(this.state.screen){
            case "main_screen":
                return(<span className="emergency" onClick={this.changeState.bind(this, 'alert')}><i className={"fa fa-warning fa-lg "}></i>Emergency</span>);
                break;
            case "alert":
                return (
                    <div className="alert_emergency">
                        <div className="inner_c">
                            <a href={"tel:"+ localStorage.getItem('emergency_number') }><div className="big_btn">Call Emergency Contact</div></a>
                             <a href={"tel:"+ localStorage.getItem('physician_number') }><div className="big_btn">Call Physician</div></a>
                            <div className="save big_btn close " onClick={this.changeState.bind(this, 'main_screen') } >Close</div> 
                        </div>
                        <div className="blur"></div>
                    </div>
                );
                break;
            default:
                return(<h1>Error</h1>);
        }
    }
});
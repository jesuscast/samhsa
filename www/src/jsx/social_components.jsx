const emergency = require('./emergency.js');
let csrfSafeMethod = function(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};
let users_url = 'https://samhsa-ebdef.firebaseio.com/users/';

exports.SocialScreen = React.createClass({
    getInitialState: function(){
        return {
            data: {
                physician_name : '',
                physician_number: '',
                emergency_name : '',
                emergency_number: ''
            },
            iteration: 0
        };
    },
    componentDidMount: function(){
        let self = this;
        $.ajax({
            async: true,
            url: users_url+window.unique_id+'/.json',
            method: 'GET',
            dataType: 'json',
            complete: function(data){
                window.test_me = data;
                if(data.responseJSON != null) {
                    let j = data.responseJSON;
                    window.k = j;
                    self.setState({
                        data : {
                            physician_name: j.physician_name,
                            physician_number: j.physician_number,
                            emergency_name: j.emergency_name,
                            emergency_number: j.emergency_number
                        },
                        iteration: self.state.iteration+1
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
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
    },
    saveData: function(){
        let physician_name = $("#physician_name").val();
        let physician_number = $("#physician_number").val();
        let emergency_name = $("#emergency_name").val();
        let emergency_number = $("#emergency_number").val();
        console.log(physician_number+' '+physician_name+' '+emergency_number+' '+emergency_name);
        if(physician_name != '' && physician_number != '' && emergency_number != '' && emergency_name != ''){
            let data_to_send = {
                "physician_name": physician_name,
                "physician_number": physician_number,
                "emergency_name": emergency_name,
                "emergency_number": emergency_number
            };
            window.sendingMe = data_to_send;
            let self = this;
            $.ajax({
                async: true,
                url: users_url+window.unique_id+'/.json',
                method: 'PATCH',
                dataType: 'json',
                data: JSON.stringify(data_to_send),
                complete: function(result){
                    console.log(result);
                    self.setState({ data: data_to_send, iteration: self.state.iteration+1 });
                    alert('Saved!');
                    localStorage.setItem('physician_number', data_to_send.physician_number);  
                    localStorage.setItem('physician_name', data_to_send.physician_name);  
                    localStorage.setItem('emergency_number', data_to_send.emergency_number);  
                    localStorage.setItem('emergency_name', data_to_send.emergency_name); 
                },
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
        } else {
            console.log('One or more values needs to be filled');
        }
    },
    render:  function(){
        return (
            <div className="content full">
                <section>
                    <header>
                        <b>My Profile</b>
                        <emergency.Emergency />
                    </header>
                    <article className="drug_article">
                        <h1 className="drug_name">My Physician</h1>
                    </article>
                    <div className="data_fields">
	                    <ul>
		                    <li><label>Name: </label> <input id="physician_name" type="text" defaultValue = { this.state.data.physician_name } /></li>
		                    <li><label>Number: </label><input id="physician_number" type="text" pattern="\d*" defaultValue = { this.state.data.physician_number } /></li>
		                    <div className="clear"></div>
	                    </ul>
	                    <div className="clear"></div>
                    </div>
                    <article className="drug_article">
					    <h1 className="drug_name">Emergency Contact</h1>
					</article>
					<div className="data_fields">
						<ul>
						    <li><label>Name: </label> <input id="emergency_name" type="text" defaultValue = { this.state.data.emergency_name } /></li>
						    <li><label>Number: </label><input id="emergency_number" type="text" pattern="\d*" defaultValue = { this.state.data.emergency_number } /> </li>
						    <div className="clear"></div>
						</ul>
						<div className="clear"></div>
					</div> 
					<div className="save big_btn last_element_i" onClick = { this.saveData } >Save</div>
                    <div className="clear"></div>
                </section>
            </div>
        );
    }
});
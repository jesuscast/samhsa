const emergency = require('./emergency.js');

exports.SocialScreen = React.createClass({
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
		                    <li><label>Name: </label> <input type="text" /></li>
		                    <li><label>Number: </label><input type="text" pattern="\d*" /></li>
		                    <div className="clear"></div>
	                    </ul>
	                    <div className="clear"></div>
                    </div>
                    <article className="drug_article">
					    <h1 className="drug_name">Emergency Contact</h1>
					</article>
					<div className="data_fields">
						<ul>
						    <li><label>Name: </label> <input type="text" /></li>
						    <li><label>Number: </label><input type="text" pattern="\d*" /> </li>
						    <div className="clear"></div>
						</ul>
						<div className="clear"></div>
					</div> 
					<div className="save big_btn">Save</div>
                    <div className="clear"></div>
                </section>
            </div>
        );
    }
});
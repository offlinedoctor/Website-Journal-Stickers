import React from 'react';
import { Navigate } from "react-router-dom";

class LoginScreen extends React.Component
{
	constructor()
	{
		super()
		
		this.state=
		{
			webNavigation: "/"
		}
		
		this.loginAccount = this.loginAccount.bind(this);		
		this.registerAccount = this.registerAccount.bind(this);
	}
		
	loginAccount()
	{
		const LoginDetailsJSON =
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: document.getElementById('user').value, password: document.getElementById('pass').value})
		}	

		fetch('/ConfirmLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => 
		{
			if (data.Status == "Success")
			{
				this.setState({webNavigation: "/Dashboard"});
			}
			else
			{
				console.log("Failure");
			}
		});
	}
	
	registerAccount()
	{
		const LoginDetailsJSON=
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: document.getElementById('user').value, password: document.getElementById('pass').value})	
		}

		fetch('/CreateLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => console.log(data));
	}
				
	render()
	{
		return(
			<div>
				<form>
				  <label for="username">Username:</label>
				  <input type="text" id="user" name="fname" />
				  <label for="password">Password:</label>
				  <input type="text" id="pass" name="lname"/>
				</form>
				<button onClick={this.loginAccount}>Login</button>
				<button onClick={this.registerAccount}>Register Account</button>
				<Navigate to={this.state.webNavigation}/>
			</div>
		);	  
	}
}

export default LoginScreen;

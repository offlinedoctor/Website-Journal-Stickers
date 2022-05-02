import React from 'react';
import { Navigate } from "react-router-dom";

function ConditionalRender(props)
{
	if (props.loginSuccess == "true")
	{
		return <Navigate replace to="/Dashboard" />;
	}
	else if (props.loginSuccess == "false")
	{
		console.log("hello");
		return <h1>Incorrect login details.</h1>;
	}
	else
	{
		return <h1> is this working  </h1>;
	}
}

class LoginScreen extends React.Component
{
	constructor()
	{
		super()
		
		this.state=
		{
			loginStatus: "",
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

		fetch('http://localhost:3001/ConfirmLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => 
		{
			if (data.Status == "Success")
			{
				this.setState({loginStatus: "true"});
			}
			else
			{
				this.setState({loginStatus: "false"});
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

		fetch('http://localhost:3001/CreateLoginDetails', LoginDetailsJSON)
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
				<ConditionalRender loginSuccess={this.state.loginStatus} />
			</div>
		);	  
	}
}

export default LoginScreen;

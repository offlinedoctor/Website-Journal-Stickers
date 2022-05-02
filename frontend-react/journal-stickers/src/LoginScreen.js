import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function ConditionalRender(props)
{
	if (props.loginSuccess == "true")
	{
		return <Navigate replace to="/Dashboard" />;
	}
	else if (props.loginSuccess == "false")
	{
		console.log("hello");
		return <h1> Incorrect Details </h1>;
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
			body: JSON.stringify({username: document.getElementById('usernameID').value, password: document.getElementById('passwordID').value})
		}	

		fetch('http://localhost:3001/ConfirmLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => 
		{
			console.log(data);
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
			body: JSON.stringify({username: document.getElementById('usernameID').value, password: document.getElementById('passwordID').value})	
		}

		fetch('http://localhost:3001/CreateLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => console.log(data));
	}
				
	render()
	{
		return(
			<div>
				<div style={{display:"flex", flexDirection: "column", width: "50%"}}>
					<TextField id="usernameID" label="Username" variant="outlined" />
					<TextField id="passwordID" label="Password" variant="outlined" />
					<div style={{display: "flex", justifyContent: "center"}}>
						<Button variant="contained" onClick={this.loginAccount}>Login</Button>
						<Button variant="contained" onClick={this.registerAccount}>Register Account</Button>
					</div>
				</div>
				<ConditionalRender loginSuccess={this.state.loginStatus} />
			</div>
		);	  
	}
}

export default LoginScreen;

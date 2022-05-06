import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConditionalRender(props)
{
	if (props.loginSuccess == "true")
	{
		return (<Alert severity="success">Login Successful
					<Navigate replace to="/Dashboard" />
				</Alert>);
	}
	else if (props.loginSuccess == "false")
	{
		console.log("hello");
		return <Alert severity="error"> Incorrect Login Details!</Alert>;
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

		fetch('/ConfirmLoginDetails', LoginDetailsJSON)
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

		fetch('/CreateLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => console.log(data));
	}
				

	componentDidMount()
	{
		if(Cookies.get("userId"))
		{
			this.setState({loginStatus: "true"});
		}
	}
				
	render()
	{
		return(
			<div>
				<div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "75vh", alignItems: "center"}}>
					<Typography sx={{fontSize: 36}}> Journal Stickers </Typography>
					<div style={{display:"flex", flexDirection: "column", width: "50%", backgroundColor: "rgba(255,255,255,0.8)", padding: "35px", borderRadius: "15px"}}>
						<TextField id="usernameID" label="Username" variant="outlined" style={{backgroundColor: "white", borderRadius: "5px"}}/>
						<TextField id="passwordID" label="Password" variant="outlined" style={{backgroundColor: "white", borderRadius: "5px"}}/>
						<div style={{display: "flex", justifyContent: "center"}}>
							<Button variant="contained" onClick={this.loginAccount}>Login</Button>
							<Button variant="contained" onClick={this.registerAccount}>Register Account</Button>
						</div>
					</div>
					<ConditionalRender loginSuccess={this.state.loginStatus} />
				</div>
			</div>
		);	  
	}
}

export default LoginScreen;

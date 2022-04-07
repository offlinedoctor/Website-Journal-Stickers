import React from 'react';

class LoginScreen extends React.Component
{
	constructor()
	{
		super();
		
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

		fetch('http://localhost:4000/ConfirmLoginDetails', LoginDetailsJSON)
        .then(response => response.json())
		.then(data => console.log(data));
	}
	
	registerAccount()
	{
		const LoginDetailsJSON=
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: document.getElementById('user').value, password: document.getElementById('pass').value})	
		}

		fetch('http://localhost:4000/CreateLoginDetails', LoginDetailsJSON)
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
			</div>
		);	  
	}
}

export default LoginScreen;

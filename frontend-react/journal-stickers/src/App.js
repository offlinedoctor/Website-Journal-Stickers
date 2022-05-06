import React from 'react';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';



class App extends React.Component
{	
	render()
	{
		return(
			<div>
				<Routes>
					<Route path="/" element={<LoginScreen />} />
					<Route path="/Dashboard" element={<Dashboard/>} />
				</Routes>
			</div>
		);	  
	}
}

export default App;

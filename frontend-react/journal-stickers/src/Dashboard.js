import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ForwardIcon from '@mui/icons-material/Forward';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

function ConditionalRender(props)
{
	if (props.loginSuccess == "true")
	{
		return <></>
	}
	else if (props.loginSuccess == "false")
	{
		return <Navigate replace to="/LoginScreen" />;
	}
}

class Dashboard extends React.Component
{	

	constructor()
	{
		super();
		
		this.state =
		{
			BlogPostList: [],
			loginStatus: "",
		}
		
		this.SubmitBlogPost = this.SubmitBlogPost.bind(this);
	}
	
	SubmitBlogPost()
	{
			const BlogPostDetailsJSON =
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({blogpost: document.getElementById('BlogPost').value})
			}	
			
			console.log(BlogPostDetailsJSON);
			
			fetch('/SubmitBlogPost', BlogPostDetailsJSON)
			.then(response => response.json())
			.then(data => this.setState({BlogPostList: data}));
			
			console.log(Cookies.get("userId"));
			
	}

	componentDidMount() 
	{
		if(Cookies.get("userId"))
		{
			this.setState({loginStatus: "true"});
			this.SubmitBlogPost();
		}
		else
		{
			this.setState({loginStatus: "false"});
		}
	}
	
	render()
	{	
		return(
			<div style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Grid container spacing={2} style={{height: "500px", overflowY: "auto", width: "500px", overflowX: "hidden"}}>
				{
					this.state.BlogPostList.map(eachIteration => 
						<Grid item>
							<Paper style={{display: "inline-block"}} elevation={3}>
								<h1> {eachIteration.blogpost} </h1>
							</Paper>
						</Grid>
					)
				}
				</Grid>
				<div style={{display: "flex", flexDirection: "column", width: "25%"}}>
					<TextField id="BlogPost" label="Blog Idea" variant="outlined" inputProps={{ maxLength: 12 }}/>
					<Button variant="contained" onClick={this.SubmitBlogPost} endIcon={<ForwardIcon />}> Submit </Button>
				</div>
				<ConditionalRender loginSuccess={this.state.loginStatus} />
			</div>
		);	  
	}
}

export default Dashboard;

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ForwardIcon from '@mui/icons-material/Forward';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

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
				body: JSON.stringify({blogpost: document.getElementById('BlogPost').value, date: new Date().toLocaleString()})
			}	
			
			console.log(BlogPostDetailsJSON);
			
			fetch('/SubmitBlogPost', BlogPostDetailsJSON)
			.then(response => response.json())
			.then(data => this.setState({BlogPostList: data}));
									
			document.getElementById('BlogPost').value = "";
			
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
			<>
				<div style={{display: "flex", flexDirection: "column", width: "25%", position: "fixed", backgroundColor: "white", borderRadius: "5px"}}>
					<TextField id="BlogPost" label="Blog Idea" variant="outlined" inputProps={{ maxLength: 12 }}/>
					<Button variant="contained" onClick={this.SubmitBlogPost} endIcon={<ForwardIcon />}> Submit </Button>
				</div>
				<div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "250px"}}>
					<Grid container spacing={2} style={{overflowY: "auto", overflowX: "hidden"}}>
					{
						this.state.BlogPostList.map(eachIteration => 
							<Grid item>
								<Paper style={{display: "inline-block"}} elevation={3}>
									<div style={{padding: "10px"}}>
										<Typography sx={{fontSize: 12}} style={{color: "#757575"}}> Date: {eachIteration.date} </Typography>
										<div style={{borderBottom: "1px solid black"}}/>
										<Typography variant="h4"> {eachIteration.blogpost} </Typography>
									</div>
								</Paper>
							</Grid>	
						)
					}
					</Grid>
					<ConditionalRender loginSuccess={this.state.loginStatus} />
				</div>
			</>
		);	  
	}
}

export default Dashboard;

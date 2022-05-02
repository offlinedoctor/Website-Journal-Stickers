import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ForwardIcon from '@mui/icons-material/Forward';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

class Dashboard extends React.Component
{	

	constructor()
	{
		super();
		
		this.state =
		{
			BlogPostList: [],
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
			
			fetch('http://localhost:3001/SubmitBlogPost', BlogPostDetailsJSON)
			.then(response => response.json())
			.then(data => this.setState({BlogPostList: data}));
	}

	componentDidMount() 
	{
		this.SubmitBlogPost();
	}
	
	render()
	{	
	

		return(
			<div style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Grid container spacing={2} style={{height: "500px", overflowY: "auto", width: "500px", overflowX: "auto"}}>
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
			</div>
		);	  
	}
}

export default Dashboard;

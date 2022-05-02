import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ForwardIcon from '@mui/icons-material/Forward';
import Paper from '@mui/material/Paper';

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
			<div>
				<div style={{display: "flex", flexDirection: "column", width: "25%"}}>
					<TextField id="BlogPost" label="Blog Idea" variant="outlined" />
					<Button variant="contained" onClick={this.SubmitBlogPost} endIcon={<ForwardIcon />}> Submit </Button>
				</div>
				{
					this.state.BlogPostList.map(eachIteration => 
						<Paper elevation={3}>
							<h1> {eachIteration.blogpost} </h1>
						</Paper>
					)
				}
			</div>
		);	  
	}
}

export default Dashboard;

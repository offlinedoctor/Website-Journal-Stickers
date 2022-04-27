import React from 'react';

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
		
		fetch('/SubmitBlogPost', BlogPostDetailsJSON)
        .then(response => response.json())
		.then(data => this.setState({BlogPostList: data}));
		
	}
	
	render()
	{	
		return(
			<div>
				<textarea name="Text1" id="BlogPost" cols="40" rows="5"></textarea>
				<button onClick={this.SubmitBlogPost}> Submit Blog Post </button>
				{
					this.state.BlogPostList.map(eachIteration => 
						<h1> {eachIteration.blogpost} </h1>
					)
				}
				<h1>
					Pcgaming
				</h1>
			</div>
		);	  
	}
}

export default Dashboard;

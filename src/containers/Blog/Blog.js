import React, {Component} from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from "axios";

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {...post, author: 'Max'}
            })
            this.setState({posts: updatedPosts});

        } catch (error) {
            this.setState({error: true});
        }
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    };

    render() {
        let posts = <p>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post title={post.title} key={post.id} author={post.author}
                             clicked={() => this.postSelectedHandler(post.id)}/>
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;

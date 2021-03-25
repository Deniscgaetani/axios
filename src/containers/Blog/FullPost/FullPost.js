import React, {Component} from 'react';

import './FullPost.css';
import axios from "../../../axios";

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.id !== prevProps.id) {
            const post = await axios.get('posts/' + this.props.id);
            this.setState({loadedPost: post})
            console.log(this.state);
        }
    }

    deletePostHandler = async () => {
        const deleteMethod = await axios.delete('posts/' + this.props.id)
        console.log('delete>', deleteMethod);
    }

    render() {
        let post = <p style={{textAlign: 'center'}}> Please select a Post</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}> Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.data.title}</h1>
                    <p>{this.state.loadedPost.data.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );

        }
        return post;
    }
}

export default FullPost;

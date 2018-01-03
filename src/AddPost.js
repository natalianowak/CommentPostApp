/**
 * Created by miziak on 11/23/2017.
 */
import React, {Component} from 'react';
import './AddPost.css'
import './App'

class AddPost extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            photo: ''
        };
        this.handleAddingPhoto = this.handleAddingPhoto.bind(this);
        this.handleAddingDescription = this.handleAddingDescription.bind(this);
        this.handleAddingPost = this.handleAddingPost.bind(this);
        this.handleAddingName = this.handleAddingName.bind(this);
    }


    handleAddingPhoto(event) {
        this.setState({...this.state, photo: event.target.value});
    }

    handleAddingDescription(event) {
        this.setState({...this.state, description: event.target.value});
    }

    handleAddingPost(event) {
        event.preventDefault();

        var date = new Date().toLocaleString();
        var photo = this.state.photo;
        var description = this.state.description;
        var name = this.state.name;
        var commentTable = [];

        this.props.createPostCallback({
            name: name,
            date: date,
            photo: photo,
            description: description,
            commentTable: commentTable
        });
    }

    handleAddingName(event) {
        this.setState({...this.state, name: event.target.value});
    }

    render() {
        console.log("to jest AddPost compoinent");
        return (
            <div className="App">
            <div className="App-add box-shadow">
                <form>
                    <div className="input-field">
                        <label>name</label>
                        <input className="form-control" type="text" value={this.state.name}
                               onChange={this.handleAddingName}/>
                    </div>
                    <div className="input-field">
                        <label>post</label>
                    <input className="form-control" onChange={this.handleAddingPhoto} type="text"  value={this.state.photo}/>
                    </div>

                    <div className="input-field">
                    <label>description</label>
                        <input className="form-control" type="text" value={this.state.description}
                               onChange={this.handleAddingDescription}/>
                    </div>

                    <img className="dodaj btn " onClick={this.handleAddingPost} src='/Dodaj.png'/>
                </form>
            </div>
            </div>
        );
    }

}
export default AddPost;
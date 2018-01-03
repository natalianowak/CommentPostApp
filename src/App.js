import React, {Component} from 'react';
import './App.css';
import AddPost from "./AddPost";
import AddComment from "./AddComment"


class App extends Component {

    constructor() {
        super();
        this.state = {
            ifAddingPostStage: false,
            newComment: '',
            name: '',
            allComment: [],
            posts: [],
            warningFlag: false
        };
        this.handleNewComment = this.handleNewComment.bind(this);
        this.handleAddingComment = this.handleAddingComment.bind(this);
        this.handleNewName = this.handleNewName.bind(this);
        this.handleAddingPhoto = this.handleAddingPhoto.bind(this);
        this.newPostAdded = this.newPostAdded.bind(this);

    }

    newPostAdded(post) {
        console.log('bla');
        console.log(post);
        console.log(post.name);
        this.state.posts.unshift(post);
        console.log(this.state.posts);
        this.setState({...this.state, ifAddingPostStage: false});
    }

    handleNewComment(event) {
        const newValue = event.target.value;
        this.setState({...this.state, newComment: newValue, warningFlag: newValue.length >=1});
    }

    handleNewName(event) {
        this.setState({...this.state, name: event.target.value});
    }

    handleAddingComment(event) {
        var name = this.state.name;
        var comment = this.state.newComment;
        var date = new Date().toLocaleString();

        console.log(comment);
        //if comment === " " lub "" nie pushuj
        if (comment === "" || comment === "") {
            return;
        }
        if (name === "") {
            name = "Anonymous";
            this.state.allComment.unshift([comment, name, date]);
            this.setState({...this.state, newComment: '', name: '', warningFlag:false});
        }
        else {
            this.state.allComment.unshift([comment, name, date]);
            this.setState({...this.state, newComment: '', name: '',  warningFlag:false});
        }
    }

    renderComments() {

        return (
            <ul>
                <div>{this.renderNumber()}</div>
                {this.state.allComment.map(function (comment) {
                    return <ul className="box-comment">
                        <li>{comment[1]}</li>
                        <li>{comment[0]}</li>
                        <li>{comment[2]}</li>
                    </ul>

                })}
            </ul>
        )
    }
    renderNumber() {
        var numberOfComments = this.state.allComment.length;
        if (numberOfComments === 0) {
            return (
                <p className="noUnderline">There is no comment yet. Be first!!!</p>
            );
        }
        if (numberOfComments === 1) {
            return (
                <p className="underline">There is 1 comment</p>
            );
        } else {
            return (
                <p className="underline">There is {numberOfComments} comments</p>
            );
        }
    }

    handleAddingPhoto() {
        this.setState({...this.state, ifAddingPostStage: true});
        //if handle adding photo stage

        console.log("adding photo");

    }
    renderButton() {

        if (this.state.warningFlag === false) {
            return (
                <div className="button-right">
                    <img className="btn disabled" onClick={this.handleAddingComment} src='/DodajGrey.png'/>
                </div>
            )
        }
        if (this.state.warningFlag === true) {
            return (
                <div className="button-right">
                    <img className="btn" onClick={this.handleAddingComment} src='/Dodaj.png'/>
                </div>
            )
        }
    }

    render() {
        if (this.state.ifAddingPostStage === false) {
            return (
                <div className="App">
                    <header>
                        <h4>Fell free to add some text and comment</h4>
                        {/*dodac box-shadow do guzika jak bedzie obciete tlo*/}

                        <img className="btn" onClick={this.handleAddingPhoto} src='/Dodaj.png'/>
                    </header>


                    <div className="App-body box-shadow">
                        <p className="firstPost">Aplikacja umożliwia dodawanie postów w postaci tekstowej oraz komentowanie postów.
                            Komentarze i posty opatrzone są aktualną datą i godziną. Napisana w technologi React.js</p>
                        <p className="firstPostDescription">#app #description #new #project #react #javascript</p>
                        <div className="comment">
                            <div className=" input-left2">
                                <div className="input-field">
                                    <label>name</label>
                                    <input className="form-control" type="text" value={this.state.name}
                                           onChange={this.handleNewName}/>

                                </div>
                                <div className="input-field">
                                    <label>comment</label>
                                    <input className="form-control" type="text" value={this.state.newComment}
                                           onChange={this.handleNewComment}/>

                                </div>
                            </div>
                            {this.renderButton()}
                        </div>
                        <div className="App-commentBox">
                            {this.renderComments()}
                        </div>

                    </div>

                    <ul>
                        {this.state.posts.map(function (post) {
                            return<div className="App-body box-shadow">
                            <ul >
                                <div className="post">
                                <li className="postAutor">{post.name}</li>
                                <li className="postBody">{post.photo}</li>
                                <li className="postDescription">{post.description}</li>
                                <li className="postDate">{post.date}</li>
                                </div>
                                <AddComment commentTable={post.commentTable}/>

                                {/*do add comment przekacac commenttable*/}
                                {/*<li>{post.commentTable}</li>*/}

                                {/*if(post.commentTable.length ===0){*/}
                                {/**/}
                                {/*}*/}

                            </ul>
                            </div>

                        })}
                    </ul>


                </div>
            );
        } else {
            return (
                <AddPost createPostCallback={this.newPostAdded}/>
            );
        }
    }
}

export default App;
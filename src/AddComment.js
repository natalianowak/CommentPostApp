/**
 * Created by miziak on 12/1/2017.
 */
import React, {Component} from 'react';
import './AddComment.css'
import './App'


class AddComment extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            newComment: '',
            warningFlag: false
        };
        this.handleNewComment = this.handleNewComment.bind(this);
        this.handleAddingComment = this.handleAddingComment.bind(this);
        this.handleNewName = this.handleNewName.bind(this);

    }


    handleNewName(event) {
        this.setState({...this.state, name: event.target.value});
    }

    handleNewComment(event) {
        const newValue = event.target.value;
        this.setState({...this.state, newComment: newValue, warningFlag: newValue.length >=1});
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
            this.props.commentTable.unshift([comment, name, date]);
            this.setState({...this.state, newComment: '', name: '', warningFlag:false});
        }
        else {
            this.props.commentTable.unshift([comment, name, date]);
            this.setState({...this.state, newComment: '', name: '',  warningFlag:false});
        }
    }

    renderComments() {
        return (
            <ul>
               {this.renderNumber()}
                {this.props.commentTable.map(function (comment) {
                    return <ul className="box-comment">
                        <li>{comment[0]}</li>
                        <li>{comment[1]}</li>
                        <li>{comment[2]}</li>
                    </ul>
                })}
            </ul>
        )
    }

    renderNumber() {
        var numberOfComments = this.props.commentTable.length;
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

    renderButton() {

        if (this.state.warningFlag === false) {
            return (
                <div className="button-right">
                    <img className="dodaj btn disabled" onClick={this.handleAddingComment} src='/DodajGrey.png'/>
                </div>
            )
        }
        if (this.state.warningFlag === true) {
            return (
                <div className="button-right">
                    <img className="dodaj btn" onClick={this.handleAddingComment} src='/Dodaj.png'/>
                </div>
            )
        }
    }

    render() {
        console.log(this.props.commentTable);

        return (
            <div className="">

                <div className="comment">
                    <div className="input-left">
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
        )
    }


}
export default AddComment;
import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    console.log("style obj should be: ", this.props.colour);
    return (

    <div style={this.props.color} className="message">
      <span className="message-username">{this.props.username}</span>
      { this.props.content.search(/\.jpg/) !== -1 ? (
        <span className="message-content"><img className="img-msg" src={this.props.content}></img></span>
        ) : (
        <span className="message-content">{this.props.content}</span>
        )}
    </div>
    );
  }
}
export default Message;


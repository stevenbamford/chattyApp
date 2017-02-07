import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    return (

      <main className="messages">

       {this.props.messages.map(message =>
         <Message key={message.id} username={message.username} content={message.content}/>
       )}

      </main>
    );
  }
}
export default MessageList;

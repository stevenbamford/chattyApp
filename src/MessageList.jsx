import React, {Component} from 'react';
import Message from './Message.jsx';


const colour = {
  color:"green"
}

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    return (

      <main className="messages">

       {this.props.messages.map(message => {

          if(message.type === "incomingMessage"){
              return <Message color={message.color} key={message.id} username={message.username} content={message.content} />
          }else{
           return <div key={message.id} className="message system">
            {message.content}
           </div>
          }
        }
       )}

      </main>
    );
  }
}
export default MessageList;

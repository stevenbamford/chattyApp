import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props){

    super(props);
    this.state = {

      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      numUsersOnline: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

addMessage = (event) => {
  if(event.key == "Enter"){
    let postMessage = JSON.stringify({type: "postMessage", username: this.state.currentUser.name, content: event.target.value});
    this.socket.send(postMessage);
    event.target.value = "";
  }
}

enterUsername = (event) => {
  if(event.key == "Enter"){
      let postNotification = JSON.stringify({type: "postNotification", content: this.state.currentUser.name + " changed their name to " + event.target.value + "."})
      this.socket.send(postNotification);
      this.setState({currentUser: {name: event.target.value}});
  }
}

componentDidMount() {

  this.socket = new WebSocket("ws://localhost:4000");
  console.log("Connected to server.");

  this.socket.onmessage = (event) => {

    const data = JSON.parse(event.data);
    console.log(data);
    switch(data.type) {
      case "incomingMessage":
        let messages = this.state.messages.concat(data);
        this.setState({messages: messages});
        break;
      case "incomingNotification":
        let notifications = this.state.messages.concat(data);
        this.setState({messages: notifications});
        break;

      case "numUsersOnline":
        this.setState({numUsersOnline: [data.content]});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  }
}


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="numUsers"> {this.state.numUsersOnline} Users Online</div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar enterUsername={this.enterUsername} addMessage={this.addMessage} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;

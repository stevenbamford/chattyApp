import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props){

    super(props);
    this.state = {

      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

addMessage = (event) => {
  if(event.key == "Enter"){
    let messageToSend = JSON.stringify({username: this.state.currentUser.name, content: event.target.value});
    this.socket.send(messageToSend);
    event.target.value = "";
  }
}

enterUsername = (event) => {
  if(event.key == "Enter"){
    if(event.target.value){
      this.setState({currentUser: {name: event.target.value}});
    }
  }
}

componentDidMount() {

  this.socket = new WebSocket("ws://localhost:4000");
  console.log("Connected to server.");

  this.socket.onmessage = (event) => {
    let incomingData = JSON.parse(event.data);
    const messages = this.state.messages.concat(incomingData);
    this.setState({messages: messages});
  }
}


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar enterUsername={this.enterUsername} addMessage={this.addMessage} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;

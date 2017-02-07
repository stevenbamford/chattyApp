import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props){

    super(props);
    this.state = {

      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
  }

addMessage = (event) => {
  if(event.key == "Enter"){
    // const newMessage = {id: (this.state.messages.length + 1), username: this.state.currentUser.name, content: event.target.value };
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    let messageToSend = JSON.stringify({username: this.state.currentUser.name, content: event.target.value});
    this.socket.send(messageToSend);
    event.target.value = "";
  }
}

componentDidMount() {

  // console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);


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
        <Chatbar addMessage={this.addMessage} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;

import React, {Component} from 'react';

class Chatbar extends Component {

  render() {
    console.log("Rendering <Chatbar/>");
    return (
      <footer className ="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.enterKeyPressed}/>
      </footer>

    );
  }
}
export default Chatbar;

import React, {Component} from 'react';

class Chatbar extends Component {

  render() {
    return (
      <footer className ="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress={this.props.enterUsername} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.addMessage}/>
      </footer>

    );
  }
}
export default Chatbar;

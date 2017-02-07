import React, {Component} from 'react';

class Chatbar extends Component {


  onKeyPress = (event) =>{
    if (event.key == "Enter"){
      console.log(event.target.value);
      this.props.enterKeyPressed(event);
      event.target.value = '';
    }
  }

  render() {
    console.log("Rendering <Chatbar/>");
    return (
      <footer className ="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress}/>
      </footer>

    );
  }
}
export default Chatbar;

// import logo from './logo.svg';
import React from 'react';
import ReactPlayer from 'react-player';
import './App.css';


function GreetingMessage() {
  const message = 'Hello Ana!';
  return (
    <div>
      <u>{message}</u>
    </div>
  );
}

function WelcomeBlock() {
  return (
    <div>
      <GreetingMessage />
      <em>Welcome to our cool page. It is pleasure to have you here!</em>
    </div>
  );
}
function Classroom() {
  return (
    <div>
      <em> This are your students</em>
      <Student name="Erick" age="31" />
      <Student name="Carlos" age="20" />
      <Student name="Ale" age="38" />
    </div>
  );
}
function Student(props) {
  // const name = 'Ana Ortez';
  return (
    <div>
      <p>{props.name} - {props.age} years old.</p>
    </div>
  );
}
function User(props) {
  return <div>User is: {props.firstName}</div>;
}

function UsersList(props) {
  return <div> {props.children} </div>;
}

class Color extends React.Component {
  render() {
    return <div>{this.props.favColor}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <GreetingMessage />
      <hr />
      <WelcomeBlock />
      <hr />
      {/* <Student /> */}
      <hr />
      <Classroom/>
      <hr />
      <UsersList>
        <User firstName="Harper" />
        <User firstName="Mike" />
        <User firstName="Alvaro" />
        <User firstName="Andrea" />
      </UsersList>
      <hr />
      <Color favColor="blue" />
      <hr />
      <ReactPlayer url="https://vimeo.com/channels/top/22439234" playing />
      // see the new props!
        <ReactPlayer
          url="https://www.youtube.com/watch?v=kJQP7kiw5Fk"
          playing
          controls
          volume="0.5"
        />
    </div>
  );
}

export default App;

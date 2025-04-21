// App.js
import React, { useState } from 'react';
import LiveClass from './liveVideo';

function MainLive() {
  const [startClass, setStartClass] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const roomID = "demooo-1212"; 
  const userID = String(Math.floor(Math.random() * 10000));
  const userName = isHost ? "Teacher" : "Student";

  if (startClass) {
    return (
      <LiveClass
        roomID={roomID}
        userID={userID}
        userName={userName}
        isHost={isHost}
      />
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Live Education App</h1>
      <button onClick={() => { setIsHost(true); setStartClass(true); }}>
        Start as Teacher
      </button>
      <br /><br />
      <button onClick={() => { setIsHost(false); setStartClass(true); }}>
        Join as Student
      </button>
    </div>
  );
}

export default MainLive;

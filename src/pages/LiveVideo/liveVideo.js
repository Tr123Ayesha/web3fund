// LiveClass.js
import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const LiveClass = ({ roomID, userID, userName, isHost }) => {
  // Your Zego App ID and Server Secret
  const appID = 916913788; 
  const serverSecret = 'f2826bd41c262a3a9c034d89e4c7dcc7'; // Your Server Secret

  // Generate a token for testing (only for development, in production use your own backend)
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    userID,
    userName
  );

  // Join the meeting with the generated token
  const myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: isHost
          ? ZegoUIKitPrebuilt.LiveStreaming // Teacher (Host)
          : ZegoUIKitPrebuilt.LiveStreaming, // Student (Audience)
        config: {
          role: isHost ? 'Host' : 'Audience',
        },
      },
    });
  };

  return (
    <div>

      <div ref={myMeeting} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default LiveClass;

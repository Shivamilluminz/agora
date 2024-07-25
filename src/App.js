import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import axios from "axios";

function App() {
  const [inCall, setInCall] = useState(false);
  const [getRtcProps, setRtcProps] = useState(null);
    const [RtmProps, setRtmProps] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const[selectedIndex, setSelectedCallIndex] = useState(null);

    const joinCall = (id, index) => {
      setSelectedCallIndex(index);
  
      // Define your payload here
      const payload = {
        communityId: 1, // replace with your actual communityId
        conferenceId: 27,
      };
      const headers ={
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVTJGc2RHVmtYMSs3Vyt6ZGFMMVVBTTVONHM2WnNlcDJZOEVjODRlN2hoQjFWYU1MamFkZnZlenhRaUgwcm1xN01WZnowUUdoWTFncHZ4SEp5NkNrVWJaU2lWcXpBSWx4L3RpVnM0a1FFVUpkcklJS3owQnN0SnBjamRTanVvR1ZlbjUwRFNWK2JaYmFPWnF1OWdZZEVoL3VhRXlMSXhWdWNEN3h5UHpISTFiWkxwL3lCR3l2dGYvcnNYL292MkZ5cmlyeHdWSHRYVjV4bG1ORk5UMiszYjBrOC9kdWpFNDlPMVRHK0paSDkxWFJRYVdGZnBLTUNmL2RIVm1ONVB4V1RpK1RPc1FlWnlrVlVSWXQzNmVGMUplZ1FOa3RaRDBpdlQyNS8vRytxeGdJTFQzNFMvUzdubXRTMWdnSHlHcFdZVStYSGlQamc2aE40UE5wZ2F6bFBoYlVPN0x2L3E0aE1CcVVNSTcyZFNwdGxFOElBdk1FTDVOaUN5djcxaS80WGVXbWxFWnEyZDdNYWo2M2lucjRvQT09IiwiaWF0IjoxNzIxODg1MDI0LCJleHAiOjE3MjE5MjgyMjR9.Sh8fG54zQ5olU6s7Gws1Jsotf-fW4XONV9-LnVZ816o",
      }
  
      axios.post("https://api.quali-fi.com/joinConference", payload,{headers})
      
        .then((response) => {
          console.log("Joined the conference successfully", response?.data?.responseData);
          const data = response?.data?.responseData;
  
          setPreviewData(data);
          setRtcProps({
            appId: "9c6de947bbb740249cbe50e36ec131bf",
            channel: data.channelName,
            uid: data.memberId,
            token: data.token,
            layout: data.layout ? data.layout : "grid", // Adjust as necessary
            enableScreensharing: true,
            screenshareUid: data.screenShareUid,
            screenshareToken: data.screenShareToken,
          });
          setRtmProps({
            token: data.rtmToken,
            uid: data.rtmUid,
            username: data.displayName,
            displayUsername: true,
          });
  
          setInCall(true);
        })
        .catch((error) => {
          console.error("Failed to join the conference", error);
        });
    };

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          // onClick={() => setInCall(true)}
         onClick = {() => joinCall(1,27)}
        >
          Join Call
        </Button>
      )}
    </div>
  );
}

export default App;

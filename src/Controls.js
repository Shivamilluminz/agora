import { useState } from "react";
import { useClient,useLocalScreenTrack } from "./settings";
import { Grid, Button } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';
import StopScreenShareOutlinedIcon from '@mui/icons-material/StopScreenShareOutlined';
import AgoraRTC from "agora-rtc-sdk-ng";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [screenTrack, setScreenTrack] = useState(null);

  const mute = async (type) => {
    console.log(tracks,"tracks")
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    if (screenTrack) {
      screenTrack.close();
    }
    setStart(false);
    setInCall(false);
  };

  const toggleScreenShare = async () => {
    if (!screenTrack) {
      const localScreenTrack = await AgoraRTC.createScreenVideoTrack();
      setScreenTrack(localScreenTrack);
      await client.publish([localScreenTrack]);
    } else {
      await client.unpublish([screenTrack]);
      screenTrack.close();
      setScreenTrack(null);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={ "primary"}
          onClick={() => toggleScreenShare()}

        >
          {screenTrack ? <StopScreenShareOutlinedIcon /> : <ScreenShareOutlinedIcon />}
          </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="default"
          onClick={() => leaveChannel()}
        >
          Leave
          <ExitToAppIcon />
        </Button>
      </Grid>
    </Grid>
    
  );
}

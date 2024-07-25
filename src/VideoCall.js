import { useState, useEffect, useRef } from "react";
import { config, useClient, useMicrophoneAndCameraTracks, channelName, } from "./settings.js";
import { Button, Grid } from "@material-ui/core";
import Video from "./Video";
import Controls from "./Controls";
import VirtualBackgroundExtension from "agora-extension-virtual-background";
import AgoraRTC from "agora-rtc-react";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
   const client = useClient();
  // var client = AgoraRTC.createClient({mode: "rtc", codec: "vp9"});
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [virtualBackgroundEnabled, setVirtualBackgroundEnabled] = useState(false);
  const extension = new VirtualBackgroundExtension();

  AgoraRTC.registerExtensions([extension]);
  var bgFilterProcessor = useRef(null);
  const checkCompatibility = async() => {
    return extension.checkCompatibility()
  }

  useEffect(async()=>{
    if (!bgFilterProcessor.current && tracks?.length == 2) {
       bgFilterProcessor.current = extension.createProcessor();
       await bgFilterProcessor.current.init();
       tracks[1].pipe(bgFilterProcessor.current).pipe(tracks[1].processorDestination);
    }

  },[bgFilterProcessor,tracks])


// Degree 1 = LOW, Degree 2 = Medium, Degree 3 = HIGH
const enableBlurFilter = async (blurDegree = 1)=>{
  if (bgFilterProcessor?.current && checkCompatibility()){
    bgFilterProcessor.current.setOptions({type: 'blur', blurDegree});
    await bgFilterProcessor.current.enable();
  }
}

const enablColorFilter = async (color = '#00ff00')=>{
  if (bgFilterProcessor?.current && checkCompatibility()){
    bgFilterProcessor.current.setOptions({type: 'color', color});
    await bgFilterProcessor.current.enable();
  }
}



// const loadImage = (src) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => resolve(img);
//     img.onerror = (err) => reject(new Error(`Failed to load image: ${JSON.stringify(err)}}`));
//   });
// };

// const imagePath = require('./assets/virtual.jpg');


const enableImageFilter =  (imageSource) => {
  if (bgFilterProcessor?.current && checkCompatibility()){

    // try {
    // const imgElement = await loadImage('https://w7.pngwing.com/pngs/279/877/png-transparent-hyperlink-computer-icons-link-text-logo-number.png')
   
    //   bgFilterProcessor?.current.setOptions({type: 'img', source: imgElement});
    //   await bgFilterProcessor?.current.enable();
    // }catch(e) {
    //   alert(e)
    //   // document.getElementById("loading").style.display = "none";
    // }

     const imgElement1 = document.createElement('img');
     imgElement1.crossOrigin = 'anonymous';
     imgElement1.onload = async() => {
      
       bgFilterProcessor?.current.setOptions({type: 'img', source: imgElement1});
       await bgFilterProcessor?.current.enable();
    }
    imgElement1.onerror = (err) => alert(`Failed to load image: ${JSON.stringify(err)}}`);
    imgElement1.src = 'https://tinyjpg.com/images/social/website.jpg';
   
  }

  // imgElement.onload = async() => {
  //   // document.getElementById("loading").style.display = "block";
   
  // }

  
 

};


const disableFilter = async()=>{
  if (bgFilterProcessor?.current){
    await bgFilterProcessor?.current.disable();
    // tracks[1].unpipe();
  }
}

useEffect(()=>{
  virtualBackgroundEnabled ? enableBlurFilter():disableFilter()

},[virtualBackgroundEnabled])





  useEffect(() => {
    const init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => [...prevUsers, user]);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio" && user.audioTrack) user.audioTrack.stop();
        if (mediaType === "video") {
          setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
      });

   
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [channelName, client, ready, tracks, virtualBackgroundEnabled]);



  const toggleVirtualBackground = () => {
    setVirtualBackgroundEnabled((prev) => !prev);
  };

  console.log("Tracks:", tracks);


  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item style={{ height: "5%", display: "flex" }}>
        {ready && tracks && (
          <>
            <Button onClick={toggleVirtualBackground}>
              {virtualBackgroundEnabled ? "Disable" : "Enable"} Background
            </Button>
            <Button onClick={()=>enableImageFilter()}>
              Set Background Image
            </Button>
            <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
          </>
        )}
      </Grid>
      <Grid item style={{ height: "95%" }}>
        {tracks && <Video tracks={tracks} users={users} />}
      </Grid>
  
    </Grid>
  );
}

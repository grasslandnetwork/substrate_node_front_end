import React, {useEffect, useState} from 'react';
import Webcam from "react-webcam";

function Main(props) {
  const [selectedOption, setSelectedOption] = useState("webcam");

  useEffect(() => {
    const video = document.querySelector('.videoTag');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing media devices.', err);
      });
  }, []);

  return (
    <div>
      <input type="radio" value="webcam" checked={selectedOption === "webcam"} onChange={(e) => setSelectedOption(e.target.value)} /> Webcam
      <input type="radio" value="youtube" checked={selectedOption === "youtube"} onChange={(e) => setSelectedOption(e.target.value)} /> Youtube
      <input type="radio" value="rtsp" checked={selectedOption === "rtsp"} onChange={(e) => setSelectedOption(e.target.value)} /> RTSP
    {selectedOption === "webcam" && <Webcam />}
    {selectedOption === "youtube" && <iframe width="560" height="315" src="YOUTUBE_LINK" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
    {selectedOption === "rtsp" && 
    <video className='videoTag' autoPlay loop muted width="600px">
    <source src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4' type='video/mp4' />
    </video>
    }
    </div>
  )
}

export default function VideoPlayer(props) {
  return <Main />
}


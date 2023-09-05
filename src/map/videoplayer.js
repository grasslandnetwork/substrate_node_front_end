import React, {useEffect, useState} from 'react';
import Webcam from "react-webcam";

function Main(props) {
    const [selectedOption, setSelectedOption] = useState("webcam");
    const [videoUrl, setVideoUrl] = useState("");  // Add this line


    const handleInputChange = (event) => {
        setVideoUrl(event.target.value);
    }

    const handleButtonClick = () => {
        fetch(`http://127.0.0.1:5000/change_video_source?video_url=${videoUrl}`)
            .catch(err => console.error(err));
    }

    
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
          <input type="text" value={videoUrl} onChange={handleInputChange} />
          <button onClick={handleButtonClick}>Change Video Source</button>
          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="webcam">Webcam</option>
              <option value="rtsp">RTSP</option>
          </select>
          

      {selectedOption === "webcam" && <Webcam />}
      {selectedOption == "rtsp" && <img src="http://127.0.0.1:5000/video_feed" style={{ width: '600px'}} alt="Video Stream" /> }
    </div>
  )
}

export default function VideoPlayer(props) {
  return <Main />
}


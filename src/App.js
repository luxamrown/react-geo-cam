import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const permsGranted  = "granted"
  const permsDenied = "denied"
  const [coordinate, setCoordinate] = useState({latitude:"", longitude:""})
  const [statusPerms, setStatusPerms] = useState("")
  const [videoStream, setVideoStream] = useState(null);

  const getStatusPerms = async () => {await navigator.permissions.query({name:"geolocation"}).then((obj) => {setStatusPerms(obj.state)})}

  const getCoordinate = () =>{
    getStatusPerms()
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoordinate({latitude:position.coords.latitude, longitude:position.coords.longitude})
    });
    
    if(!(statusPerms === permsGranted)){
      setCoordinate({latitude:"", longitude:""})
    }

  }

  const handleCameraClick = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        setVideoStream(stream);
        const video = document.getElementById('camera');
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log('Error accessing camera: ' + error.message);
      });
  };

  useEffect(() => {
    console.log(statusPerms)
  }, [statusPerms])

  useEffect(() => {
    getStatusPerms()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Geolocation
        </p>
        <button type='button' onClick={getCoordinate}>Get Coordinate Sir</button>
        <h1>Coordinate</h1>
        <p1>Latitude : {coordinate.latitude}</p1>
        <p1>Longitude : {coordinate.longitude}</p1>
        <p1>Perms Status : {statusPerms}</p1>
        <p>
          Camera
        </p>
        <button onClick={handleCameraClick}>Open Camera</button>
        <video id="camera" autoPlay muted width={400} height={400} />
      </header>
    </div>
  );
}

export default App;

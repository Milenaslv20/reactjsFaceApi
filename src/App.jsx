import { useRef, useEffect } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // LOAD FROM USEEFFECT
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  // OPEN YOUR FACE WEBCAM
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LOAD MODELS FROM FACE API
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    const detectFaces = async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
  
      // Clear the canvas before drawing new detections
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
  
      // DRAW ONLY FACE DETECTIONS (ONLY SQUARE AROUND THE FACE)
      faceapi.draw.drawDetections(canvasRef.current, detections);
  
      // Chama detectFaces novamente no próximo quadro
      requestAnimationFrame(detectFaces);
    };
  
    // Inicia a detecção assim que o componente for montado
    detectFaces();
  };

  return (
    <div className="myapp">
      <div className="appvide">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
        <canvas ref={canvasRef} width="640" height="480" className="appcanvas" />
      </div>
    </div>
  );
}

export default App;
import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(blob));
      uploadAudio(blob);
      chunks.current = [];
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const uploadAudio = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/speech/upload-audio/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Transcription:', data.transcription);
      alert(`Transcript:\n${data.transcription}`);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  );
};

export default AudioRecorder;

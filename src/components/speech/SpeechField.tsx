import { useState, useRef } from 'react';

const SpeechField = () => {
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');

        try {
          const response = await fetch('http://localhost:8000/transcribe', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Server error:', response.status, errorText);
            setTranscript(`[Server error ${response.status}]: ${errorText}`);
            return;
          }

          const data = await response.json();
          console.log('✅ Transcription response:', data);
          setTranscript(data.transcript || '[No transcript returned]');
        } catch (err: any) {
          console.error('❌ Fetch failed:', err);
          setTranscript(`[Fetch error]: ${err.message || err}`);
        }
      };

      mediaRecorder.start();
      setTranscript('🎙️ Recording...');
      setRecording(true);
    } catch (err: any) {
      console.error('❌ Microphone access error:', err);
      setTranscript(`[Microphone error]: ${err.message || err}`);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded text-white ${
            recording ? 'bg-red-500' : 'bg-blue-600'
          }`}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded h-32"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Transcript will appear here..."
      />
    </div>
  );
};

export default SpeechField;

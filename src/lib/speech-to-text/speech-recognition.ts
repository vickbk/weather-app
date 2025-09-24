"use client";
import { useState } from "react";
import { CustomGlobals } from "../globals";

export default function speechRecognition() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const SpeechConstructor =
    CustomGlobals.get("SpeechRecognition") ||
    CustomGlobals.get("webkitSpeechRecognition");
  if (!SpeechConstructor) return null;

  const recognition = new SpeechConstructor() as any;

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.onresult = (event: any) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptPart = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        setTranscript((prev) => prev + transcriptPart);
      } else {
        interimTranscript += transcriptPart;
      }
    }
  };
  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return { transcript, isListening, startListening, stopListening };
}

import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { handIcon, microphoneOutlineIcon } from "@progress/kendo-svg-icons";
import { useEffect } from "react";

export default function SpeechToTextButton({
  speechControls: { transcript, isListening, startListening, stopListening },
  setSearchInput,
}: {
  speechControls: {
    transcript: string;
    isListening: boolean;
    startListening: () => void;
    stopListening: () => void;
  };
  setSearchInput: (input: string) => void;
}) {
  const handleClick = () => {
    if (isListening) return stopListening();
    startListening();
  };
  useEffect(() => {
    transcript &&
      !isListening &&
      setSearchInput(transcript.replaceAll(".", ""));
  }, [transcript, isListening]);
  return (
    <Button
      type="button"
      className="search-label-icons microphone no-border"
      onClick={handleClick}
    >
      <SvgIcon icon={isListening ? handIcon : microphoneOutlineIcon} />
    </Button>
  );
}

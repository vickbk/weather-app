import { ReactElement } from "react";

export default function SearchElement({
  text,
  icon,
  selectSuggestion,
}: {
  icon: ReactElement;
  text: string;
  selectSuggestion?: (suggestion: string) => void;
}) {
  const setSuggestion = () => {
    selectSuggestion?.(text.split(",")[0]);
  };
  return (
    <article
      className={`search-element spi-5 flex g-1 a-center${
        selectSuggestion && " cursor-p"
      }`}
      onClick={setSuggestion}
    >
      {icon} <span className="flex-grow spbl-5 search-text">{text}</span>
    </article>
  );
}

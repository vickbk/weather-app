import { GeocodingPlaceResult } from "@/lib/types/geocoding";
import { ReactElement } from "react";

export default function SearchElement({
  text,
  icon,
  setSelected,
  searchData,
}: {
  icon: ReactElement;
  text: string;
  setSelected?: (suggestion: GeocodingPlaceResult) => void;
  searchData?: GeocodingPlaceResult;
}) {
  const setSuggestion = () => {
    setSelected?.(searchData!);
  };
  return (
    <article
      className={`search-element spi-5 flex g-1 a-center ${
        setSelected && " cursor-p"
      }`}
      onClick={setSuggestion}
    >
      {icon} <span className="flex-grow spbl-5 search-text">{text}</span>
    </article>
  );
}

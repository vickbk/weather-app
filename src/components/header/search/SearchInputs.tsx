import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { Button } from "@progress/kendo-react-buttons";
import { UnstyledContext } from "@progress/kendo-react-common";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import SearchBox from "./SearchBox";
import Image from "next/image";
import searchIcon from "@images/icon-search.svg";
import { GeocodingPlaceResult, GeocodingResults } from "@/lib/types/geocoding";
import speechRecognition from "@/lib/speech-to-text/speech-recognition";
import SpeechToTextButton from "./SpeechToTextButton";
import { getRecentSearches } from "@/lib/memorization/recent-search";
import { useActionState, useState } from "react";
import { Coordinates } from "@/lib/types/places-types";
import errorProneTransition from "@/lib/globals/error-prone-transition";
import { LoadingStatus } from "@/lib/types/loading-status";
import getPlaceSuggestions from "@/actions/getPlaceSuggestions";

export default function SearchInputs({
  states: { searching, searchStatus },
  methods: { setSearching, setCoordinates, errorTrigger },
}: {
  states: {
    searching: boolean;
    searchStatus: boolean;
  };
  methods: {
    setSearching: (state: boolean) => void;
    setCoordinates: (coords: Coordinates | null) => void;
    errorTrigger: (status: LoadingStatus) => void;
  };
}) {
  const speechControls = speechRecognition();
  const [searchInput, setSearchInput] = useState("");
  const [recentSearches, setRecentSearches] = useState<GeocodingResults | null>(
    null
  );

  const [suggestions, getSuggestionAction, suggestionState] = useActionState(
    getPlaceSuggestions,
    null
  );

  const handleSearchSuggestion = (e: InputChangeEvent) => {
    const { value } = e;
    setSearchInput(value);
    setCoordinates(null);
    setSearching(true);
    setRecentSearches(getRecentSearches(value));
    !recentSearches &&
      errorProneTransition(
        () => getSuggestionAction(value),
        errorTrigger,
        "error"
      );
  };
  const getSearchItem = ({
    name,
    country,
    latitude,
    longitude,
  }: GeocodingPlaceResult) => {
    setSearchInput(`${name}, ${country}`);
    setCoordinates({ latitude: latitude!, longitude: longitude! });
  };

  return (
    <UnstyledContext.Provider
      value={{ uInput: {}, ...kendoButtonResetterObject }}
    >
      <label className="search-label flex-grow">
        <Image
          className="search-label-icons search"
          src={searchIcon}
          alt="search icon"
          width={18}
          height={18}
        />
        <Input
          className="search-input sp-5 pis-3 sbr-5 no-border"
          placeholder="Search for a place..."
          onBlur={() => setTimeout(() => setSearching(false), 500)}
          name="name"
          value={searchInput}
          onChange={handleSearchSuggestion}
          required
          autoComplete="off"
        />
        {speechControls && (
          <SpeechToTextButton
            speechControls={speechControls}
            setSearchInput={setSearchInput}
          />
        )}
        {searching && (
          <SearchBox
            searchProgress={suggestionState || searchStatus}
            searchResults={
              (!searchStatus && (recentSearches || suggestions)) || null
            }
            selectSuggestion={getSearchItem}
          />
        )}
      </label>
      <Button
        type="submit"
        className="search-button flex-grow sp-5 sbr-5 no-border"
      >
        Search
      </Button>
    </UnstyledContext.Provider>
  );
}

import searchIcon from "@images/icon-search.svg";
import Image from "next/image";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { UnstyledContext } from "@progress/kendo-react-common";
import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { Button } from "@progress/kendo-react-buttons";
import SearchBox from "./search-box/SearchBox";
import { startTransition, useActionState, useEffect, useState } from "react";
import getPlaceSuggestions from "@/actions/getPlaceSuggestions";
import { GeocodingPlaceResult } from "@/lib/types/geocoding";
import { Coordinates } from "@/lib/types/places-types";
import searchInit from "@/actions/searchInit";
import { error } from "console";

export default function SearchForm() {
  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, getSuggestionAction, suggestionState] = useActionState(
    getPlaceSuggestions,
    null
  );
  const [searchResults, searchInitProcess, searchStatus] = useActionState(
    searchInit,
    null
  );
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const handleSearchSuggestion = (e: InputChangeEvent) => {
    setSearchInput(e.value);
    setCoordinates(null);
    startTransition(() => getSuggestionAction(e.value));
  };

  useEffect(() => {
    if (searchResults && !searchStatus) {
      if ("error" in searchResults) {
        console.log(searchResults.error);
        return;
      }
      // startTransition(()=>{});
      console.log(searchResults);
      setSearching(false);
    }
  }, [searchResults, searchStatus]);

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
    <form
      className="search grid sg-7 j-center xs-up-flex"
      action={searchInitProcess}
    >
      <input
        type="hidden"
        name="latitude"
        value={coordinates?.latitude || ""}
      />
      <input
        type="hidden"
        name="longitude"
        value={coordinates?.longitude || ""}
      />
      <UnstyledContext.Provider
        value={{ uInput: {}, ...kendoButtonResetterObject }}
      >
        <label className="search-label flex-grow">
          <Image
            className="search-label-icon"
            src={searchIcon}
            alt="search icon"
            width={18}
            height={18}
          />
          <Input
            className="search-input sp-5 pis-3 sbr-5 no-border"
            placeholder="Search for a place..."
            onFocus={() => setSearching(true)}
            onBlur={() => setTimeout(() => setSearching(false), 500)}
            name="name"
            value={searchInput}
            onChange={handleSearchSuggestion}
            required
          />
          {searching && (
            <SearchBox
              searchProgress={suggestionState || searchStatus}
              searchResults={(!searchStatus && suggestions) || null}
              selectSuggestion={getSearchItem}
            />
          )}
        </label>
        <Button
          type="button"
          className="search-button flex-grow sp-5 sbr-5 no-border"
        >
          Search
        </Button>
      </UnstyledContext.Provider>
    </form>
  );
}

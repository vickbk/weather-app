import { InputChangeEvent } from "@progress/kendo-react-inputs";
import { startTransition, useActionState, useEffect, useState } from "react";
import getPlaceSuggestions from "@/actions/getPlaceSuggestions";
import { GeocodingPlaceResult } from "@/lib/types/geocoding";
import { Coordinates } from "@/lib/types/places-types";
import searchInit from "@/actions/searchInit";
import { SearchTriggers } from "@/lib/types/search-types";
import SearchCoordinates from "./search/SearchCoordinates";
import SearchInputs from "./search/SearchInputs";

export default function SearchForm({
  triggers: { searchTrigger, errorTrigger },
}: {
  triggers: SearchTriggers;
}) {
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
    setSearching(true);
    startTransition(() => getSuggestionAction(e.value));
  };

  useEffect(() => {
    if (searchResults && !searchStatus) {
      if ("error" in searchResults) {
        errorTrigger("no-result");
        console.log(searchResults.error);
        return;
      }
      startTransition(() => searchTrigger({ ...searchResults }));
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
      {coordinates && <SearchCoordinates coordinates={coordinates} />}

      <SearchInputs
        states={{
          searchInput,
          searching,
          suggestions,
          suggestionState,
          searchStatus,
        }}
        methods={{ setSearching, handleSearchSuggestion, getSearchItem }}
      />
    </form>
  );
}

import { startTransition, useActionState, useEffect, useState } from "react";
import getPlaceSuggestions from "@/actions/getPlaceSuggestions";
import { Coordinates } from "@/lib/types/places-types";
import searchInit from "@/actions/searchInit";
import { SearchTriggers } from "@/lib/types/search-types";
import SearchCoordinates from "./search/SearchCoordinates";
import SearchInputs from "./search/SearchInputs";
import { addRecentSearch } from "@/lib/memorization/recent-search";

export default function SearchForm({
  triggers: { searchTrigger, errorTrigger },
}: {
  triggers: SearchTriggers;
}) {
  const [searching, setSearching] = useState(false);
  const [suggestions, getSuggestionAction, suggestionState] = useActionState(
    getPlaceSuggestions,
    null
  );
  const [searchResults, searchInitProcess, searchStatus] = useActionState(
    searchInit,
    null
  );
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (searchResults && !searchStatus) {
      if ("error" in searchResults) {
        errorTrigger("no-result");
        console.log(searchResults.error);
        return;
      }
      addRecentSearch(searchResults);
      startTransition(() => searchTrigger({ ...searchResults }));
      setSearching(false);
    }
  }, [searchResults, searchStatus]);

  return (
    <form
      className="search grid sg-7 j-center xs-up-flex"
      action={searchInitProcess}
    >
      {coordinates && <SearchCoordinates coordinates={coordinates} />}

      <SearchInputs
        states={{
          searching,
          suggestions: suggestions,
          suggestionState,
          searchStatus,
        }}
        methods={{
          setSearching,
          getSuggestionAction,
          setCoordinates,
        }}
      />
    </form>
  );
}

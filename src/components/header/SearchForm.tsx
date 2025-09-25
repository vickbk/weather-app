import { startTransition, useActionState, useEffect, useState } from "react";
import getPlaceSuggestions from "@/actions/getPlaceSuggestions";
import { Coordinates } from "@/lib/types/places-types";
import searchInit from "@/actions/searchInit";
import { SearchTriggers } from "@/lib/types/search-types";
import SearchAdditionalData from "./search/SearchAdditionalData";
import SearchInputs from "./search/SearchInputs";
import { addRecentSearch } from "@/lib/memorization/recent-search";
import getNextDay from "@/lib/date/get-next-day";
import getDateOnly from "@/lib/date/get-date-only";
import { UnitsType } from "@/lib/types/units-types";

export default function SearchForm({
  triggers: { searchTrigger, errorTrigger },
  units,
}: {
  triggers: SearchTriggers;
  units: UnitsType;
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
      startTransition(() =>
        searchTrigger({
          ...searchResults,
          end_date: getDateOnly(getNextDay(undefined, 6)),
        })
      );
      setSearching(false);
    }
  }, [searchResults, searchStatus]);

  return (
    <form
      className="search grid sg-7 j-center xs-up-flex"
      action={searchInitProcess}
    >
      {<SearchAdditionalData coordinates={coordinates} units={units} />}

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

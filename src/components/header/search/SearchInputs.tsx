import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { Button } from "@progress/kendo-react-buttons";
import { UnstyledContext } from "@progress/kendo-react-common";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import SearchBox from "./SearchBox";
import Image from "next/image";
import searchIcon from "@images/icon-search.svg";
import { GeocodingPlaceResult, GeocodingResults } from "@/lib/types/geocoding";

export default function SearchInputs({
  states: {
    searchInput,
    searching,
    suggestionState,
    searchStatus,
    suggestions,
  },
  methods: { setSearching, handleSearchSuggestion, getSearchItem },
}: {
  states: {
    searchInput: string;
    searching: boolean;
    suggestionState: boolean;
    searchStatus: boolean;
    suggestions:
      | GeocodingResults
      | {
          error: any;
        }
      | null;
  };
  methods: {
    setSearching: (state: boolean) => void;
    handleSearchSuggestion: (e: InputChangeEvent) => void;
    getSearchItem: (item: GeocodingPlaceResult) => void;
  };
}) {
  return (
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
          onBlur={() => setTimeout(() => setSearching(false), 500)}
          name="name"
          value={searchInput}
          onChange={handleSearchSuggestion}
          required
          autoComplete="off"
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
        type="submit"
        className="search-button flex-grow sp-5 sbr-5 no-border"
      >
        Search
      </Button>
    </UnstyledContext.Provider>
  );
}

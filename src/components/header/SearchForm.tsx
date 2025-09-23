import searchIcon from "@images/icon-search.svg";
import Image from "next/image";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { UnstyledContext } from "@progress/kendo-react-common";
import kendoButtonResetterObject from "@/lib/kendoreact/buttonResetterObject";
import { Button } from "@progress/kendo-react-buttons";
import SearchBox from "./search-box/SearchBox";
import { startTransition, useActionState, useEffect, useState } from "react";
import getPlaceSuggestions from "@/actions/getPlaceSuggestions";

export default function SearchForm() {
  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, getSuggestionAction, suggestionState] = useActionState(
    getPlaceSuggestions,
    null
  );

  const handleSearch = (e: InputChangeEvent) => {
    setSearchInput(e.value);
    startTransition(() => getSuggestionAction(e.value));
  };
  return (
    <form className="search grid sg-7 j-center xs-up-flex">
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
            onBlur={() => setSearching(false)}
            value={searchInput}
            onChange={handleSearch}
          />
          {searching && (
            <SearchBox
              searchProgress={suggestionState}
              searchResults={suggestions}
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
    </form>
  );
}

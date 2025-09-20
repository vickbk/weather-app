import searchIcon from "@images/icon-search.svg";
import Image from "next/image";
import { Input } from "@progress/kendo-react-inputs";
import { UnstyledContext } from "@progress/kendo-react-common";

export default function SearchForm() {
  return (
    <form className="search grid sg-7 j-center xs-up-flex">
      <UnstyledContext.Provider value={{ uInput: {}, uButton: {} }}>
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
          />
        </label>
        <button
          type="submit"
          className="search-button flex-grow sp-5 sbr-5 no-border"
        >
          Search
        </button>
      </UnstyledContext.Provider>
    </form>
  );
}

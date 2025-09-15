import searchIcon from "@images/icon-search.svg";
import Image from "next/image";

export default function SearchForm() {
  return (
    <section className="header__search">
      <form className="search-form">
        <label className="search-label">
          <Image src={searchIcon} alt="search icon" />
          <input type="text" placeholder="Search for a place..." />
        </label>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </section>
  );
}

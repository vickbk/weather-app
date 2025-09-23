import { SvgIcon } from "@progress/kendo-react-common";
import { mapMarkerIcon } from "@progress/kendo-svg-icons";

import ProgressSearch from "./ProgressSearch";
import SearchElement from "./SearchElement";
import { GeocodingPlaceResult, GeocodingResults } from "@/lib/types/geocoding";

export default function SearchBox({
  searchProgress,
  searchResults,
  selectSuggestion,
}: {
  searchProgress: boolean;
  searchResults: null | { error: any } | GeocodingResults;
  selectSuggestion: (suggestion: GeocodingPlaceResult) => void;
}) {
  const { results } = (searchResults ?? {}) as GeocodingResults;
  const setSelected = (placeData: GeocodingPlaceResult) => {
    selectSuggestion(placeData);
  };
  return (
    <>
      {(results || searchProgress) && (
        <article className="search-box smbls-5 neutral-700 sbr-5 sp-5 no-border">
          {searchProgress && <ProgressSearch />}
          {results &&
            results.map(({ name, country, id, latitude, longitude }, key) => (
              <SearchElement
                key={`${key}_${id}`}
                icon={<SvgIcon icon={mapMarkerIcon} />}
                text={`${name}, ${country}`}
                setSelected={setSelected}
                searchData={{ latitude, longitude, name, country }}
              />
            ))}{" "}
        </article>
      )}
    </>
  );
}

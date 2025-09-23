import { SvgIcon } from "@progress/kendo-react-common";
import { mapMarkerIcon } from "@progress/kendo-svg-icons";

import ProgressSearch from "./ProgressSearch";
import SearchElement from "./SearchElement";
import { GeocodingResults } from "@/lib/types/geocoding";

export default function SearchBox({
  searchProgress,
  searchResults,
}: {
  searchProgress: boolean;
  searchResults: null | { error: any } | GeocodingResults;
}) {
  const { results } = (searchResults ?? {}) as GeocodingResults;
  return (
    <>
      {(results || searchProgress) && (
        <article className="search-box smbls-5 neutral-700 sbr-5 sp-5 no-border">
          {searchProgress && <ProgressSearch />}
          {results &&
            results.map(({ name, country }) => (
              <SearchElement
                icon={<SvgIcon icon={mapMarkerIcon} />}
                text={`${name}, ${country}`}
              />
            ))}{" "}
        </article>
      )}
    </>
  );
}

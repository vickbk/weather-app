import { SvgIcon } from "@progress/kendo-react-common";
import { mapMarkerIcon } from "@progress/kendo-svg-icons";

import ProgressSearch from "./ProgressSearch";
import SearchElement from "./SearchElement";

export default function SearchBox() {
  return (
    <article className="search-box smbls-5 neutral-700 sbr-5 sp-5 no-border">
      <ProgressSearch />
      {/* <SearchElement icon={<SvgIcon icon={mapMarkerIcon} />} text="A place" /> */}
      {/* <SearchElement icon={<SvgIcon icon={mapMarkerIcon} />} text="A place" /> */}
    </article>
  );
}

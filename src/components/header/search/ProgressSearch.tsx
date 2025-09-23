import { Loader } from "@progress/kendo-react-indicators";
import SearchElement from "./SearchElement";

export default function ProgressSearch() {
  return (
    <SearchElement
      icon={
        <Loader type="converging-spinner" size="small" themeColor="light" />
      }
      text="Search in progress"
    />
  );
}

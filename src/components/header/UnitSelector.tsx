import settingIcon from "@images/icon-units.svg";
import Dropdown from "../common/Dropdown";

export default function UnitSelector({
  content,
  setCloser,
}: {
  content: React.ReactElement;
  setCloser: (closer: () => void) => void;
}) {
  return (
    <Dropdown
      icon={{ text: "settings icon", img: settingIcon }}
      text="Units"
      specialClass="unit-selector"
      content={content}
      setCloser={setCloser}
    />
  );
}

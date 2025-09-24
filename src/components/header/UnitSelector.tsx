import settingIcon from "@images/icon-units.svg";
import Dropdown from "../common/Dropdown";

export default function UnitSelector({
  content,
}: {
  content: React.ReactElement;
}) {
  return (
    <Dropdown
      icon={{ text: "settings icon", img: settingIcon }}
      text="Units"
      specialClass="unit-selector"
      content={content}
    />
  );
}

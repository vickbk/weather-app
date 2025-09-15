import Image from "next/image";
import settingIcon from "@images/icon-units.svg";
import dropDown from "@images/icon-dropdown.svg";
import Dropdown from "../common/Dropdown";

export default function UnitSelector() {
  return (
    <div className="unit-selector">
      <Dropdown
        icon={{ text: "settings icon", img: settingIcon }}
        text="Units"
      />
    </div>
  );
}

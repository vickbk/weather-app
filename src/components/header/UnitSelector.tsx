import Image from "next/image";
import settingIcon from "@images/icon-units.svg";
import dropDown from "@images/icon-dropdown.svg";

export default function UnitSelector() {
  return (
    <div className="unit-selector">
      <Image src={settingIcon} alt="Setting icon" width={30} height={30} />
      Units
      <Image src={dropDown} alt="Drop down icon" />
    </div>
  );
}

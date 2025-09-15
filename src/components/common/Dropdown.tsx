import Image from "next/image";
import dropDownIcon from "@images/icon-dropdown.svg";

export default function Dropdown({
  text,
  icon,
}: {
  text: string;
  icon?: { text: string; img: any };
}) {
  return (
    <>
      {icon && <Image src={icon.img} alt={icon.text} />}
      {text}
      <Image src={dropDownIcon} alt="Drop down icon" />
    </>
  );
}

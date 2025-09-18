import Image from "next/image";
import dropDownIcon from "@images/icon-dropdown.svg";

export default function Dropdown({
  text,
  icon,
  specialClass,
}: {
  text: string;
  icon?: { text: string; img: any };
  specialClass?: string;
}) {
  return (
    <article
      className={`${specialClass && specialClass + " "}flex sg-2 center`}
    >
      {icon && <Image src={icon.img} alt={icon.text} />}
      {text}
      <Image src={dropDownIcon} alt="Drop down icon" />
    </article>
  );
}

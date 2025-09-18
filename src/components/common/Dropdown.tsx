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
      className={`${
        specialClass && specialClass + " "
      }dropdown flex sg-3 sp-4 center cursor-p`}
    >
      {icon && <Image src={icon.img} alt={icon.text} />}
      {text}
      <Image src={dropDownIcon} alt="Drop down icon" />
    </article>
  );
}

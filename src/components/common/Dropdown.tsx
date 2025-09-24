"use client";

import Image from "next/image";
import dropDownIcon from "@images/icon-dropdown.svg";
import PopupElement from "./Popup";
import { ReactElement, useState } from "react";

export default function Dropdown({
  text,
  icon,
  specialClass,
  content,
}: {
  text: string;
  icon?: { text: string; img: any };
  specialClass?: string;
  content?: ReactElement;
}) {
  const [open, doOpen] = useState(false);
  return (
    <article className="relative">
      <button
        className={`${
          specialClass && specialClass + " "
        }dropdown flex sg-3 sp-4 center cursor-p no-border`}
        onClick={() => doOpen(!open)}
      >
        {icon && <Image src={icon.img} alt={icon.text} />}
        {text}
        <Image src={dropDownIcon} alt="Drop down icon" />
      </button>
      {open && <PopupElement specialClass={specialClass} content={content} />}
    </article>
  );
}

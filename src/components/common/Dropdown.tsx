"use client";

import Image from "next/image";
import dropDownIcon from "@images/icon-dropdown.svg";
import PopupElement from "./Popup";
import { ReactElement, useEffect, useRef, useState } from "react";

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
  const popup = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      popup.current &&
        !popup.current.contains(event.target as Node) &&
        button.current &&
        !button.current.contains(event.target as Node) &&
        doOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <article className="relative">
      <button
        ref={button}
        className={`${
          specialClass && specialClass + " "
        }dropdown flex sg-3 sp-4 center cursor-p no-border`}
        onClick={() => doOpen(!open)}
      >
        {icon && <Image src={icon.img} alt={icon.text} />}
        {text}
        <Image src={dropDownIcon} alt="Drop down icon" />
      </button>
      {open && (
        <PopupElement
          ref={popup}
          specialClass={specialClass}
          content={content}
        />
      )}
    </article>
  );
}

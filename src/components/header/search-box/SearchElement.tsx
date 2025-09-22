import { ReactElement } from "react";

export default function SearchElement({
  text,
  icon,
}: {
  icon: ReactElement;
  text: string;
}) {
  return (
    <article className="search-element spi-5 flex g-1 a-center">
      {icon} <span className="flex-grow spbl-5 search-text">{text}</span>
    </article>
  );
}

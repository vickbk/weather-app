import { ReactElement } from "react";

export default function PopupElement({
  content,
  specialClass,
}: {
  content?: ReactElement;
  specialClass?: string;
}) {
  return (
    <article
      className={`${specialClass} pop-up absolute sp-5 sbr-5 neutral-700 smt-5`}
    >
      {content || "BlaBlaBla"}
    </article>
  );
}

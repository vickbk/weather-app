import { ReactElement } from "react";

export default function PopupElement({
  content,
  specialClass,
  ref,
}: {
  content?: ReactElement;
  specialClass?: string;
  ref: React.Ref<HTMLElement>;
}) {
  return (
    <article
      ref={ref}
      className={`${specialClass} pop-up absolute sp-5 sbr-5 neutral-700 smt-5`}
    >
      {content || "BlaBlaBla"}
    </article>
  );
}

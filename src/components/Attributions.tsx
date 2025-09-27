import Link from "next/link";

export default function Attribution({
  path = "/compare",
  display = "Go To compare mode",
}: {
  path?: string;
  display?: string;
}) {
  return (
    <footer className="attribution mbls-2">
      <section className="pble-1">
        <Link
          href={path}
          className="blue-500 spbl-5 pi-1 no-border c-neutral-0 sbr-5"
        >
          {display}
        </Link>
      </section>
      Challenge by{" "}
      <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
      Coded by{" "}
      <a href="https://github.com/vickbk" target="_blank">
        VickBk
      </a>
      .
    </footer>
  );
}

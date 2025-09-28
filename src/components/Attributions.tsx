import Link from "next/link";

export default function Attribution({
  path = "/compare",
  display = "Go To compare mode",
}: {
  path?: string;
  display?: string;
}) {
  return (
    <footer className="attribution">
      <section className="pble-2 attribution-direction">
        <Link
          href={path}
          className="attribution-direction-link blue-500 c-neutral-0 spbl-5 pi-1 no-border sbr-5 hv-b-neutral-900 hv-out-blue-500 hv-blue-700 a-b-neutral-900 a-out-blue-500 a-blue-700"
        >
          {display}
        </Link>
      </section>
      Challenge by{" "}
      <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
      Coded by{" "}
      <a href="https://github.com/vickbk" target="_blank">
        VickBk
      </a>{" "}
      Including some{" "}
      <a href="https://dev.to/devteam/join-the-latest-kendoreact-free-components-challenge-3000-in-prizes-4fch?">
        KendoReact Free Components
      </a>
      .
    </footer>
  );
}

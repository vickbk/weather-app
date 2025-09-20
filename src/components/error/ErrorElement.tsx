import { Button } from "@progress/kendo-react-buttons";
import Image from "next/image";
import retryIcon from "@images/icon-retry.svg";
import errorIcon from "@images/icon-error.svg";
import { redirect } from "next/navigation";
export default function ErrorElement() {
  return (
    <article className="error pbl-3 md-up-p-3 ">
      <Image src={errorIcon} alt="" height={50} />
      <h1 className="header__title spbl-3">Something went wrong</h1>
      <p className="mble-1">
        We couldn't connect to the server (API error). <br />
        Please try again in a few moments.
      </p>
      <Button
        type="button"
        className="neutral-700 spbl-3 pi-1 sbr-5 no-border"
        onClick={() => {
          redirect("/");
        }}
      >
        <Image src={retryIcon} alt="" className="smie-2" /> Retry
      </Button>
    </article>
  );
}

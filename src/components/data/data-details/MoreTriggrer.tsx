export default function MoreTrigger({
  showMore,
  setShowMore,
}: {
  showMore: boolean;
  setShowMore: (showMore: boolean) => void;
}) {
  return (
    <article className="grid-full-width flex a-center g-1">
      <span className="flex-grow sp-1 neutral-700"></span>
      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="sp-5 neutral-700 no-border sbr-5"
      >
        Show {showMore ? "less" : "more"}
      </button>
      <span className="flex-grow sp-1 neutral-700"></span>
    </article>
  );
}

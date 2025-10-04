export default function DetailElement({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <article className="details-element neutral-700 p-1 br-1">
      <h3 className="details-element-title">{title}</h3>
      <p className="details-element-content smt-5">{content}</p>
    </article>
  );
}

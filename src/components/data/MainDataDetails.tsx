export default function MainDataDetails() {
  return (
    <section className="data__details grid gc-2 gc-sm-up-4 g-1">
      {[
        ["Feels Like", "18"],
        ["Humidity", "46%"],
        ["Wind", "14km/h"],
        ["Precipitation", "0 mm"],
      ].map(([title, content]: string[]) => (
        <article className="details-element neutral-700 p-1 br-1" key={title}>
          <h3 className="details-element-title">{title}</h3>
          <p className="details-element-content smt-5">{content}</p>
        </article>
      ))}
    </section>
  );
}

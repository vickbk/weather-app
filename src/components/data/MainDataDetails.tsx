export default function MainDataDetails() {
  return (
    <section className="data__details">
      {[
        ["Feels Like", "18"],
        ["Humidity", "46%"],
        ["Wind", "14km/h"],
        ["Precipitation", "0 mm"],
      ].map(([title, content]: string[]) => (
        <article className="details-element" key={title}>
          <h3 className="details-element-title">{title}</h3>
          <p className="details-element-content">{content}</p>
        </article>
      ))}
    </section>
  );
}

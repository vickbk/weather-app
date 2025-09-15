import Attribution from "./Attributions";
import AppData from "./data/AppData";
import AppHeader from "./header/AppHeader";

export default function MainPage() {
  return (
    <main className="container">
      <AppHeader />
      <AppData />
      <Attribution />
    </main>
  );
}

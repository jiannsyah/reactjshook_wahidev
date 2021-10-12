import "./App.css";
import { AddKontak, ListKontak } from "./components";

function App() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Aplikasi Kontak</h2>
      <hr />
      <AddKontak />
      {/* <hr />
      <ListKontak /> */}
      {/* <hr />
      <CmdKontak /> */}
    </div>
  );
}

export default App;

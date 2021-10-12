import React from "react";
import Hitung from "../components/Hitung";

export default function Home() {
  return (
    <div style={{ padding: 50 }}>
      <header>
        <h4>Aplikasi Penghitung jumlah pengunjung</h4>
      </header>
      <main>
        <hr />
        <Hitung />
        <hr />
      </main>
    </div>
  );
}

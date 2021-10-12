import React, { useState } from "react";

export default function Hitung() {
  const [jumlah, setJumlah] = useState(0);
  return (
    <div>
      <p>Jumlah Pengunjung : {jumlah} pengunjung</p>
      <button onClick={() => setJumlah(jumlah + 1)}> Tambah pengunjung</button>
      <button onClick={() => setJumlah(jumlah - 1)}> Pengunjung Keluar</button>
    </div>
  );
}

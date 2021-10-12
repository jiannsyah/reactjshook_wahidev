import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addKontak,
  updateKontak,
  getListKontak,
} from "../../actions/KontakAction";

export const useMountEffect = (fun) => useEffect(fun, []);

function AddContact() {
  const {
    getListKontakResult,
    addKontakResult,
    updateKontakResult,
    detailKontakResult,
  } = useSelector((state) => state.KontakReducer);

  const [nama, setNama] = useState("");
  const [nohp, setNohp] = useState("");
  const [id, setId] = useState("");
  const [index, setIndex] = useState(0);
  const [mhladd, setMhlAdd] = useState(false);

  const dispatch = useDispatch();
  ////////////
  const UseFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const isBoolean = (param) => typeof param === "boolean";

  const [input1Ref, setInput1Focus] = UseFocus();
  // useMountEffect(setInput1Focus);
  ///////////////////////////////////////////////////
  const displayData = (ci) => {
    if (getListKontakResult.length) {
      setNama(getListKontakResult[ci].nama);
      setNohp(getListKontakResult[ci].nohp);
      setId(getListKontakResult[ci].id);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      //uodate kontak
      dispatch(updateKontak({ id: id, nama: nama, nohp: nohp }));
    } else {
      dispatch(addKontak({ nama: nama, nohp: nohp }));
    }
  };
  const clickTop = () => {
    if (getListKontakResult.length) {
      const ci = getListKontakResult.length - 1;
      setIndex(ci);
      displayData(ci);
    }
  };
  const clickBottom = () => {
    if (getListKontakResult.length) {
      setIndex(0);
      displayData(0);
    }
  };
  const clickNext = () => {
    if (getListKontakResult.length) {
      if (index !== getListKontakResult.length - 1) {
        setIndex(index + 1);
        displayData(index + 1);
      }
    }
  };
  const clickPrev = () => {
    if (getListKontakResult.length) {
      if (index !== 0) {
        setIndex(index - 1);
        displayData(index - 1);
      }
    }
  };
  console.log("mhladd", mhladd);
  console.log("autofocus", input1Ref);
  const setAdd = () => {
    setInput1Focus();
    setMhlAdd(true);
  };
  const setChange = () => {};
  /////////////////////////////////////////////
  useEffect(() => {
    //panggil Action getListKOntak
    dispatch(getListKontak());
  }, []);
  useEffect(() => {
    if (getListKontakResult.length) {
      const ci = getListKontakResult.length - 1;
      setIndex(ci);
      displayData(ci);
    }
  }, [getListKontakResult]);
  useEffect(() => {
    if (detailKontakResult) {
      setNama(detailKontakResult.nama);
      setNohp(detailKontakResult.nohp);
      setId(detailKontakResult.id);
    }
  }, [detailKontakResult]);

  useEffect(() => {
    if (addKontakResult) {
      dispatch(getListKontak());
      setNama("");
      setNohp("");
    }
  }, [addKontakResult, dispatch]);
  useEffect(() => {
    if (updateKontakResult) {
      dispatch(getListKontak());
      setNama("");
      setNohp("");
      setId("");
    }
  }, [updateKontakResult, dispatch]);
  return (
    <div>
      <h4>{id ? "Edit Kontak" : "Add Kontak"}</h4>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          name="nama"
          placeholder="Nama . . . "
          autoComplete="off"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
          disabled={mhladd ? false : true}
          ref={input1Ref}
        />
        <input
          type="text"
          name="nohp"
          placeholder="No.Hp . . . "
          autoComplete="off"
          value={nohp}
          onChange={(event) => setNohp(event.target.value)}
          disabled
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => clickBottom()}>Bottom</button>
      <button style={{ marginLeft: "10px" }} onClick={() => clickTop()}>
        Top
      </button>
      <button style={{ marginLeft: "10px" }} onClick={() => clickPrev()}>
        Previous
      </button>
      <button style={{ marginLeft: "10px" }} onClick={() => clickNext()}>
        Next
      </button>
      <br />
      <button onClick={() => setAdd()}>Add</button>
      <button style={{ marginLeft: "10px" }} onClick={() => setChange()}>
        Change
      </button>
    </div>
  );
}

export default AddContact;

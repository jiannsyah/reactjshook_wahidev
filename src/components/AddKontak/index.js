import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addKontak,
  updateKontak,
  getListKontak,
  deleteKontak,
} from "../../actions/KontakAction";

// export const useMountEffect = (fun) => useEffect(fun, []);

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

  //!autofocus-------------------------------------------------
  const txtmhcctnm = useRef();
  const focusInput = () => {
    txtmhcctnm.current.focus();
  };
  //!disabled----------------------------------------------------
  const [formState, setFormState] = useState({
    txtmhcctnm: true,
    txtmhcnohp: true,
  });
  const [buttonState, setButtonState] = useState({
    top: false,
    next: false,
    bottom: false,
    previous: false,
    add: false,
    cancel: false,
    change: false,
  });
  //!LOGICAL
  const [logicCmd, setLogicCmd] = useState({
    mhlcmd: false,
    mhladd: false,
    mhlchange: false,
    mhldelete: false,
    mhlkosong: false,
  });
  const [mhlreset, setMhlreset] = useState(false);
  //!DISPATCH
  const dispatch = useDispatch();
  //!functions
  const setDataSource = () => {
    dispatch(getListKontak());
  };
  const seleArray = (ci) => {
    if (getListKontakResult.length) {
      setNama(getListKontakResult[ci].nama);
      setNohp(getListKontakResult[ci].nohp);
      setId(getListKontakResult[ci].id);
      // setLogicCmd((prevState) => ({ ...prevState, mhlcmd: true }));
      setLogicCmd({
        mhlcmd: true,
        mhladd: false,
        mhlchange: false,
        mhldelete: false,
        mhlkosong: false,
      });
    }
  };
  // console.log(id);
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
      seleArray(ci);
    }
  };
  const clickBottom = () => {
    if (getListKontakResult.length) {
      setIndex(0);
      seleArray(0);
    }
  };
  const clickNext = () => {
    if (getListKontakResult.length) {
      if (index !== getListKontakResult.length - 1) {
        setIndex(index + 1);
        seleArray(index + 1);
      }
    }
  };
  const clickPrev = () => {
    if (getListKontakResult.length) {
      if (index !== 0) {
        setIndex(index - 1);
        seleArray(index - 1);
      }
    }
  };
  const setDelete = () => {
    dispatch(deleteKontak(id));
    setLogicCmd((prevState) => ({
      ...prevState,
      mhlcmd: false,
      mhladd: false,
      mhlchange: false,
      mhldelete: true,
      mhlkosong: false,
    }));
    setMhlreset(true);
  };
  //!useEffect RESOURCES///////////////////////////////////////////////////////////
  useEffect(() => {
    setDataSource();
    setMhlreset(false); //!saat click cancel
  }, [mhlreset]);
  useEffect(() => {
    if (getListKontakResult.length) {
      const ci = getListKontakResult.length - 1;
      setIndex(ci);
      seleArray(ci);
    }
    if (getListKontakResult.length === 0) {
      // setLogicCmd((prevState) => ({ ...prevState, mhlkosong: true }));
      setLogicCmd({
        mhlcmd: false,
        mhladd: false,
        mhlchange: false,
        mhldelete: false,
        mhlkosong: true,
      });
      setNama("");
      setNohp("");
      setId("");
    }
    setMhlreset(false);
    setFormState((prevState) => ({
      ...prevState,
      txtmhcctnm: true,
      txtmhcnohp: true,
    }));
  }, [getListKontakResult, mhlreset]);
  //!PELENGKAP//////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (formState.txtmhcctnm === false) {
      focusInput();
    }
  }, [formState]);
  useEffect(() => {
    if (logicCmd.mhlcmd) {
      // setButtonState((prevState) => ({ ...prevState, cancel: true }));
      setButtonState({
        top: false,
        next: false,
        bottom: false,
        previous: false,
        add: false,
        cancel: true,
        change: false,
      });
      return;
    }
    if (logicCmd.mhladd || logicCmd.mhlchange || logicCmd.mhldelete) {
      setButtonState({
        top: true,
        next: true,
        bottom: true,
        previous: true,
        add: true,
        cancel: false,
        change: true,
      });
      return;
    }
    if (logicCmd.mhlkosong) {
      setButtonState({
        top: true,
        next: true,
        previous: true,
        bottom: true,
        add: false,
        cancel: true,
        change: true,
      });
      return;
    }
  }, [logicCmd]);
  // useEffect(() => {
  //   if (detailKontakResult.length) {
  //     setNama(detailKontakResult.nama);
  //     setNohp(detailKontakResult.nohp);
  //     setId(detailKontakResult.id);
  //   }
  // }, [detailKontakResult]);

  useEffect(() => {
    if (addKontakResult) {
      // dispatch(getListKontak());
      setNama("");
      setNohp("");
      setId("");
      focusInput();
    }
  }, [addKontakResult]);
  useEffect(() => {
    if (updateKontakResult) {
      dispatch(getListKontak());
      // setNama("");
      // setNohp("");
      // setId("");
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
          disabled={formState.txtmhcctnm}
          ref={txtmhcctnm}
        />
        <input
          type="text"
          name="nohp"
          placeholder="No.Hp . . . "
          autoComplete="off"
          value={nohp}
          onChange={(event) => setNohp(event.target.value)}
          disabled={formState.txtmhcnohp}
          // ref={txtmhcnohp}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => clickBottom()} disabled={buttonState.bottom}>
        Bottom
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => clickTop()}
        disabled={buttonState.top}
      >
        Top
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => clickPrev()}
        disabled={buttonState.previous}
      >
        Previous
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => clickNext()}
        disabled={buttonState.next}
      >
        Next
      </button>
      <br />
      <button
        onClick={() => {
          // setMHLADD(true);

          setFormState((prevState) => ({
            ...prevState,
            txtmhcctnm: false,
            txtmhcnohp: false,
          }));
          setLogicCmd((prevState) => ({
            ...prevState,
            mhlcmd: false,
            mhladd: true,
            mhlchange: false,
            mhldelete: false,
            mhlkosong: false,
          }));
          setNama("");
          setNohp("");
          setId("");
        }}
        disabled={buttonState.add}
      >
        Add
      </button>
      <button
        onClick={() => {
          setMhlreset(true);
        }}
        disabled={buttonState.cancel}
      >
        Cancel
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => {
          setFormState((prevState) => ({
            ...prevState,
            txtmhcctnm: false,
            txtmhcnohp: false,
          }));
          setLogicCmd((prevState) => ({
            ...prevState,
            mhlcmd: false,
            mhladd: true,
            mhlchange: false,
            mhldelete: false,
            mhlkosong: false,
          }));
        }}
        disabled={buttonState.change}
      >
        Change
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => {
          setDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default AddContact;

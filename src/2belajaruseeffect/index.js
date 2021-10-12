import React, { Component } from "react";
// import Lifecycle from "./Lifecycle";
import LifeCycleFunc from "./LifeCycleFunc";

export default class BelajarUseEffect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHide: false,
    };
  }

  render() {
    const { isHide } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <h2>Contoh lifecyle component & use effect</h2>
        <hr />
        <button onClick={() => this.setState({ isHide: !isHide })}>
          {isHide ? "Tampilkan" : "Sembunyikan"}
        </button>
        {/* {!isHide && <Lifecycle />} */}
        {!isHide && <LifeCycleFunc />}
      </div>
    );
  }
}

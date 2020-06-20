//@ts-check

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { SyncedCloudDrawing } from "./SyncedCloudDrawing";
import { MyMap } from "./MyMap";
// import { relative } from "path";

var firebaseConfig = {
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <MyMap/> */}
        <SyncedCloudDrawing/>
      </header>
    </div>
  );
}

export default App;

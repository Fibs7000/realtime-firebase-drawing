//@ts-check

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { SyncedCloudDrawing } from "./SyncedCloudDrawing";
import { MyMap } from "./MyMap";
// import { relative } from "path";

// var firebaseConfig = {
//   apiKey: "AIzaSyATKb87cWl3HVu_ZhPjPyFcHR7NNp3IMpw",
//   authDomain: "drawing-8e902.firebaseapp.com",
//   databaseURL: "https://drawing-8e902.firebaseio.com",
//   projectId: "drawing-8e902",
//   storageBucket: "drawing-8e902.appspot.com",
//   messagingSenderId: "1044099237885",
//   appId: "1:1044099237885:web:f17a7457b552d309"
// };
var firebaseConfig = {
  apiKey: "AIzaSyATKb87cWl3HVu_ZhPjPyFcHR7NNp3IMpw",
  authDomain: "drawing-8e902.firebaseapp.com",
  databaseURL: "https://drawing-8e902.firebaseio.com",
  projectId: "drawing-8e902",
  storageBucket: "drawing-8e902.appspot.com",
  messagingSenderId: "1044099237885",
  appId: "1:1044099237885:web:f17a7457b552d309"
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

//@ts-check

import React from "react";
import firebase from "firebase";
import { SketchField, Tools } from "./Sketch";
export class SyncedCloudDrawing extends React.Component {
  constructor(props) {
    super(props);
    firebase
      .database()
      .ref("images")
      .on("value", sn => {
        var data = sn.val();
        data.objects = Object.entries(data.objects).map(([key, o]) => ({
          ...o,
          fbKey: key
        }));
        this.sk.fromJSON && this.sk.fromJSON(data);
      });
  }
  sk = null;
  
  render() {
    return (
      <SketchField
        ref={v => (this.sk = v)}
        width="1024px"
        fillColor="#0000"
        onObjectAdded={o => {
          // console.log(o);
          // if(o.fill == "rgb(0,0,0)")
          o.fill = "rgb(0,0,0,0)";
          if (!o.fbKey)
            firebase
              .database()
              .ref("images/objects")
              .push(o);
        }}
        height="768px"
        tool={Tools.Pencil}
        lineColor="black"
        lineWidth={3}
      />
    );
  }
}

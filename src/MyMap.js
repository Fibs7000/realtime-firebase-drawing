//@ts-check

import logo from "./GroupUpLogo.png";

import React from "react";
import ReactMapboxGl, { Layer, Feature, Image as MapImage, MapContext, Popup } from "react-mapbox-gl";
import { GeoFire } from "geofire";
import firebase from "firebase";



const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZmliczcwMDAiLCJhIjoiY2p4MXplcGExMDE0bDQ0cXFuOXVnM2dlZSJ9.D0HbtL6Bbvd77XRzD-QmlQ",
    doubleClickZoom: true
  });

const reactLogo = new Image(50, 50);
reactLogo.src = logo;

export class MyMap extends React.Component {
  state = {
    showPopup: false,
    coordinates: [0,0],
    description: "",
    mapCenter: [15.421202, 47.063354],
    mapZoom: [13],
    groups: {}
  }

  componentDidMount(){
    const geoFire = new GeoFire(firebase.database().ref("GeoFire"));
    var geoQuery = geoFire.query({center: [47.063354, 15.421202], radius: 5000});
    geoQuery.on("key_entered", (key, location)=>{
        // this.setState({groups: {...this.state.groups, [key]: {location: location}}});
        firebase.database().ref("Groups").child(key).once("value").then((sn)=>{
            this.setState({groups: {...this.state.groups, [key]: {location: location, data: sn.val()}}})
        });
    });
  }
  render() {
      console.log(this.state);
      document.getElementsByClassName("mapboxgl-canvas").item(0)&&document.getElementsByClassName("mapboxgl-canvas").item(0).style.setProperty("position", "relative");

    const features = Object.entries(this.state.groups).map(([key, {location, data}])=> <Feature
              coordinates={[location[1], location[0]]} 
              properties={{ description: "This is da description", icon: "theatre" }} 
              onMouseEnter={(e)=> this.setState({showPopup: true, coordinates: [location[1], location[0]], description: this.getDescFromData(data)})}
              onMouseLeave={(e)=> this.setState({showPopup: false})} />);
    
    console.log(features);          

    return (
      <Map
        zoom={this.state.mapZoom}
        onZoomEnd={(map, evt)=> this.setState({mapZoom: [map.getZoom()]})}
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={this.state.mapCenter}
        onMove={(map, evt)=> this.setState({mapCenter: map.getCenter()})}
      >
      {this.state.showPopup&& <Popup
                    coordinates={this.state.coordinates}>
                    <p style={{color: "#000"}}>{this.state.description}</p>
                </Popup>}
        <MapImage id="react-logo" data={reactLogo}/>
        <Layer id="groups" type="symbol" layout={{"icon-image": "react-logo"}}>
            {features}
        </Layer>
      </Map>
    );
  }
    getDescFromData(data) {
        return <div>
            <h1>{data.activity}</h1>
            <p>{data.description}</p>
        </div>;
    }
}

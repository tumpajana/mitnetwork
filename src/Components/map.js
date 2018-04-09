import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

 class MapContainer extends Component {
     constructor(props){
        super(props);
        console.log(props);
        this.state={
            selectedPlace:'dddddddddsdgsgsdfg'
         }
         console.log(this.state.selectedPlace);
     }

    render() {
        return (
          <Map google={this.props.google}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}

           zoom={14}>
     
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} 
                    pinColor='#000000'/>
     
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
          </Map>
        );
      }
    }
     
    export default GoogleApiWrapper({
      apiKey: ("AIzaSyBwjtqAwL-ehpP2k41vDpya7zuL9-l6820")
    })(MapContainer)
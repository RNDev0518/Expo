import React,  { Component } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import * as actions from '../actions/actions'
import { connect } from 'react-redux'
import axios from 'axios'
import openMap from 'react-native-open-maps'

const { width, height } = Dimensions.get('window')

class NearbyStores extends Component {

  state = {
    location: null,
    errorMessage: null,
    places: []
  }

  goToStore = (latitude, longitude, query) => {
    openMap({ latitude , longitude, query })
  }

  componentWillMount = () => {
    this.getLocationAsync()
  }

  getNearbyLocationsOnServer = async (lat, long) => {
      console.log("LAT " + lat + "LONG " + long)
      let locations = await axios.get(`http://aqueous-scrubland-84530.herokuapp.com/locations/${lat}/${long}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      this.setState({ places: locations.data })
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permission to access location was denied' })
    }
    let location = await Location.getCurrentPositionAsync({})
    this.getNearbyLocationsOnServer(location.coords.latitude, location.coords.longitude)
    this.setState({ location }, () => console.log("CURRENT_LOCATION " + JSON.stringify(location)))
  }

  render = () => {
    if (this.state.location) {
      return (
        <MapView
          style={{ width, height }}
          showsUserLocation={true}
          initialRegion={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.08, longitudeDelta: 0.08 }}>
          {this.state.places.map(place =>
            <TouchableWithoutFeedback key={place.id} onPress={ () => console.log("FOOIUAIURIUAIu")}>
            <MapView.Marker onPress={ () => this.goToStore(place.latlon.coordinates[0], place.latlon.coordinates[1], place.name) } coordinate={{ latitude: place.latlon.coordinates[0], longitude: place.latlon.coordinates[1] }} title={place.name}/>
            </TouchableWithoutFeedback>
          )}
        </MapView>
      )
    } else {
      return (
        <View></View>
      )
    }
  }

}

export default connect(null, actions)(NearbyStores)

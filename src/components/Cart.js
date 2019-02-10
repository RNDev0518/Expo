import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

class Cart extends Component {

  renderName = () => {
    return "Cart"
  }

  render = () => {
    return(
      <View style={{width, height}}>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 16}}>
          <Icon name="basket" style={{fontSize: 68, color: '#000'}}/>
          <Text style={{color: '#000', marginLeft: 16}}>Your Cart</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user, isLoggingOut: state.auth.isLoggingOut }
}

export default connect(mapStateToProps, actions)(Cart)

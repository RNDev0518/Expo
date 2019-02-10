import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Image, ScrollView, TouchableHighlight, Platform } from 'react-native'
import { Button, Container, Header, Body, Right, Left } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'
import { Avatar,  List, ListItem, Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

// Component adds products to looks
class LookProducts extends Component {
  constructor() {
    super();
    this.state = {
      foundaton: false,
      foundaton_brand: 'Brand ABC',
      foundaton_product: 'Product XYZ',
      highlight: false,
      highlight_brand: 'Brand ABC',
      highlight_product: 'Product XYZ',
      contour: false,
      contour_brand: 'Brand ABC',
      contour_product: 'Product XYZ',
      blush: false,
      blush_brand: 'Brand ABC',
      blush_product: 'Product XYZ',
      lips: false,
      lips_brand: 'Brand ABC',
      lips_product: 'Product XYZ',
    };
  }

  onbackPressed = () => {
    Actions.pop()
  }

  renderName = () => {
    return "LookProducts"
  }

  render = () => {
    const state = this.state;
    return(
      <Container>

        <Header style={{height: width > 600 ? 80 : 70, paddingTop: 16, backgroundColor: '#602438'}}>
          <Left>
            <Icon onPress={() => this.onbackPressed()} name="arrow-back" color='white' style={{fontSize: width > 600 ? 22 : 22, paddingLeft: 16}}/>
          </Left>
          <Body style={Platform.OS === 'android' ? {left: 50, alignItems: 'center'} : {paddingTop: 8, alignItems: 'center'}}>
            <Text style={[{color: 'white', fontSize: 18}, Platform.OS === 'ios' && {fontSize: 17}]}>ADD PRODUCTS</Text>
          </Body>
          <Right>
            <Icon onPress={console.log('menu clicked')} name="menu" color='white' style={{fontSize: width > 600 ? 22 : 22, paddingRight: 16}}/>
          </Right>
        </Header>
        <ScrollView style={{width: width}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: width * 0.84, height: 230, marginVertical: width * 0.05, borderRadius: 10, overflow: 'hidden'}} >
            <Image source={{ uri: 'https://scstylecaster.files.wordpress.com/2015/04/applying_makeup.jpg'}}
              style={{  width: '100%', height: '100%', resizeMode: 'contain' }}/>
          </View>

          <TouchableHighlight onPress={() => {this.setState({foundaton: !state.foundaton})}}>
            <View style={styles.item}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}} >
                <Icon name='circle-with-plus' size={35} type='entypo' color='#521630' style={{width: 50, height: 30}} />
              </View>
              <View style={{flex: 0.7, paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start'}} >
                <Text style={{fontSize: 20}}>Foundation</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={[styles.detailView, !state.foundaton && {display: 'none'}]}>
            <View style={styles.itemView}>
              <Text style={styles.label}>BRAND NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.foundaton_brand}
                onChangeText={(value) => {this.setState({foundaton_brand: value})}}
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>PRODUCT NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.foundaton_product}
                onChangeText={(value) => {this.setState({foundaton_product: value})}}
              />
            </View>
          </View>

          <TouchableHighlight onPress={() => {this.setState({highlight: !state.highlight})}}>
            <View  style={styles.item}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}} >
                <Icon name='circle-with-plus' size={35} type='entypo' color='#521630' style={{width: 50, height: 30}} />
              </View>
              <View style={{flex: 0.7, paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start'}} >
                <Text style={{fontSize: 20}}>Highlight</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={[styles.detailView, !state.highlight && {display: 'none'}]}>
            <View style={styles.itemView}>
              <Text style={styles.label}>BRAND NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.highlight_brand}
                onChangeText={(value) => {this.setState({highlight_brand: value})}}
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>PRODUCT NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.highlight_product}
                onChangeText={(value) => {this.setState({highlight_product: value})}}
              />
            </View>
          </View>

          <TouchableHighlight onPress={() => {this.setState({contour: !state.contour})}}>
            <View  style={styles.item}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}} >
                <Icon name='circle-with-plus' size={35} type='entypo' color='#521630' style={{width: 50, height: 30}} />
              </View>
              <View style={{flex: 0.7, paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start'}} >
                <Text style={{fontSize: 20}}>Contour</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={[styles.detailView, !state.contour && {display: 'none'}]}>
            <View style={styles.itemView}>
              <Text style={styles.label}>BRAND NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.contour_brand}
                onChangeText={(value) => {this.setState({contour_brand: value})}}
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>PRODUCT NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.contour_product}
                onChangeText={(value) => {this.setState({contour_product: value})}}
              />
            </View>
          </View>

          <TouchableHighlight onPress={() => {this.setState({blush: !state.blush})}}>
            <View  style={styles.item}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}} >
                <Icon name='circle-with-plus' size={35} type='entypo' color='#521630' style={{width: 50, height: 30}} />
              </View>
              <View style={{flex: 0.7, paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start'}} >
                <Text style={{fontSize: 20}}>Blush</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={[styles.detailView, !state.blush && {display: 'none'}]}>
            <View style={styles.itemView}>
              <Text style={styles.label}>BRAND NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.blush_brand}
                onChangeText={(value) => {this.setState({blush_brand: value})}}
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>PRODUCT NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.blush_product}
                onChangeText={(value) => {this.setState({blush_product: value})}}
              />
            </View>
          </View>

          <TouchableHighlight onPress={() => {this.setState({lips: !state.lips})}}>
            <View  style={styles.item}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}} >
                <Icon name='circle-with-plus' size={35} type='entypo' color='#521630' style={{width: 50, height: 30}} />
              </View>
              <View style={{flex: 0.7, paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start'}} >
                <Text style={{fontSize: 20}}>Lips</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={[styles.detailView, !state.lips && {display: 'none'}]}>
            <View style={styles.itemView}>
              <Text style={styles.label}>BRAND NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.lips_brand}
                onChangeText={(value) => {this.setState({lips_brand: value})}}
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>PRODUCT NAME</Text>
              <TextInput
                style={styles.value}
                underlineColorAndroid='transparent'
                placeholder=""
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                value={state.lips_product}
                onChangeText={(value) => {this.setState({lips_product: value})}}
              />
            </View>
          </View>

          <View>
            <TouchableHighlight onPress={()=>{}} transparent style={{ width: 235, height: 45,
              backgroundColor: '#5B0E32', borderRadius: 50, shadowColor: '#5B0E32',
              shadowOffset: { width: 0, height: 10 },
              shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, marginVertical: 30,
              alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
            >
              <Text style={{width: 100, height: 50, top: 15, fontWeight: 'bold', color:'white',  justifyContent: 'center', alignSelf: 'center'}} >SUBMIT LOOK</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '98%',
    height: 60,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#D8D8D8',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10, 
    shadowOpacity: 0.9,
    elevation: 12,
    backgroundColor: 'white'
  },
  detailView: {
    top: -13,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 5,
    backgroundColor: '#eeeeeeee'
  },
    itemView: {
      flex: 0.5,
      padding: 10,
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
      label: {
        fontSize: 12,
        color: 'grey'
      },
      value: {
        width: '100%',
        fontSize: 18
      },
});

const mapStateToProps = state => {
  return { user: state.auth.user, isLoggingOut: state.auth.isLoggingOut }
}

export default connect(mapStateToProps, actions)(LookProducts)

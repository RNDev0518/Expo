import React, { Component } from 'react'
import { View, Dimensions, Text, Image, TouchableOpacity, AppRegistry  } from 'react-native'
import { Button, Footer, FooterTab, Icon, Body, Container, Right, Left } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'
import { Header, Avatar,  List, ListItem} from 'react-native-elements'
const { width, height } = Dimensions.get('window')

import Feed from './Feed'
import ElementAdd from './ElementAdd'
import Profile from './Profile'
import Chat from './Chat'
import Likes from './Likes'
import Cart from './Cart'
import SideMenu from './Sidemenu'

import LookAdd from './LookAdd'




class Main extends Component {




  renderElementBy = (currentTab) => {
    console.log("THIS IS THE CURRENT TAB " + currentTab)
    switch(currentTab){
      case "FEED":
        return <Feed/>
      case "ADD":
        return <ElementAdd/>
      case "PROFILE":
        return <Profile/>
      case "CHAT":
        return <Chat/>
      case "LIKES":
        return <Likes/>
      case "CART":
          return <Cart/>
      case "LOOK_ADD":
        return <LookAdd/>
      default:
        return <Feed/>
    }
  }




  render = () => {

    let { currentTab, selectTab } = this.props
    return(

      <Container>

      <Header
        centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
        rightComponent={{ icon: 'menu', color: '#fff' }}
        outerContainerStyles={{ backgroundColor: '#521630' }}
      />


        <Body>
        <SideMenu />

          {this.renderElementBy(currentTab)}
        </Body>

        <Footer style={{ backgroundColor: '#FFF' }}>
          <FooterTab style={{ backgroundColor: '#FFF' }}>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'FEED' || currentTab === 'LOOK_ADD' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab('FEED')}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'FEED' || currentTab === 'LOOK_ADD' ? '#5B0E32' : '#000'}} name="home"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'LIKES' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("LIKES")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'LIKES' ? '#5B0E32' : '#000'}} name="heart"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'ADD' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("ADD")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'ADD' ? '#5B0E32' : '#000'}} name="plus"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'CHAT' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("CHAT")}>
              <Icon type='EvilIcons' size={30} style={{fontSize: 30, color: currentTab === 'CHAT' ? '#5B0E32' : '#000'}} name="trophy"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'CART' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("CART")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'CART' ? '#5B0E32' : '#000'}} name="basket"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { currentTab: state.main.currentTab }
}


export default connect(mapStateToProps, actions)(Main)

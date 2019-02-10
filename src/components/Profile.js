import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  Dimensions
} from 'react-native'
import { Button, Container, Header, Body, Right, Left } from 'native-base'
import { Icon } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      phone: null,
      gender: null,
      passwordhidden: true,
    };
  }

  componentWillMount() {
    this.friendList = [
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Olivia Campbell'},
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Mike Riley'},
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Alicia Wechael'},
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Hans Dort'},
    ];
    this.fanList = [
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Olivia Campbell'},
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Mike Riley'},
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Alicia Wechael'},
      {avatar: 'https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg', name: 'Hans Dort'},
    ];
  }

  onbackPressed = () => {
    Actions.pop()
  }

  getUser()
  {

    var t = this.props.appGetCredentialsOnServer(this.props.user)
    console.log(t)
  }
  renderName = () => {
    let { user } = this.props
    console.log(user)
    if(!this.props.isLoggingOut){
      return user.name ? user.name : user.email
    } else {
      return "User"
    }
  }

  // render = () => {
  //   return(
  //     <View style={{width, height}}>
  //       <View style={{flexDirection: 'row', alignItems: 'center', margin: 16}}>
  //         <Icon name="ios-contact" style={{fontSize: 68, color: '#000'}}/>
  //         <Text style={{color: '#000', marginLeft: 16}}>{this.renderName()}</Text>
  //       </View>
  //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //         <Button style={{marginRight: 16, marginLeft: 16}} onPress={() =>  this.getUser()}>
  //           <Text style={{color: '#fff', fontSize: 14, paddingLeft: 8, paddingRight: 8}}>Preferences</Text>
  //         </Button>
  //         <Button onPress={() => this.props.logoutUser()}>
  //           <Text style={{color: '#fff', fontSize: 14, paddingLeft: 8, paddingRight: 8}}>Logout</Text>
  //         </Button>
  //         <View style={{paddingHorizontal: 10}}></View>
  //         <Button onPress={() => Actions.contactus()}>
  //           <Text style={{color: '#fff', fontSize: 14, paddingLeft: 8, paddingRight: 8}}>Contact Us</Text>
  //         </Button>
  //       </View>
  //     </View>
  //   )
  // }
  render = () => {
    const state = this.state;
    let data = [{
      value: 'Male',
    }, {
      value: 'Female',
    }];
    return(
      <Container>
        <Header style={{height: width > 600 ? 80 : 70, paddingTop: 16, backgroundColor: '#602438'}}>
          <Left>
            <Icon onPress={() => this.onbackPressed()} name="arrow-back" color='white' style={{fontSize: width > 600 ? 22 : 22, paddingLeft: 16}}/>
          </Left>
          <Body style={Platform.OS === 'android' ? {left: 50, alignItems: 'center'} : {paddingTop: 8, alignItems: 'center'}}>
            <Text style={[{color: 'white', fontSize: 18}, Platform.OS === 'ios' && {fontSize: 17}]}>EDIT PROFILE</Text>
          </Body>
          <Right>
            <Icon onPress={console.log('menu clicked')} name="menu" color='white' style={{fontSize: width > 600 ? 22 : 22, paddingRight: 16}}/>
          </Right>
        </Header>
        <View style={styles.headerView}>
          <View style={styles.avatarView}>
            <View style={styles.imageView}>
              <TouchableOpacity style={styles.addView}>
                <Icon name='plus' size={25} type='entypo' color='#521630'/>
              </TouchableOpacity>
              <Image source={{uri: "https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg"}} style={{ width: 150, height: 150, borderRadius: 150/2,  overflow: "hidden", shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9 }}/>
            </View>
          </View>
          <View style={styles.detailView}>

            <View style={[styles.itemView, { borderRightWidth: 0.5, borderColor: 'grey' }]}>
              <Text style={styles.valueText}>100</Text>
              <Text style={styles.propText}>MY LOOKS</Text>
            </View>

            <View style={[styles.itemView, { borderRightWidth: 0.5, borderColor: 'grey' }]}>
              <Text style={styles.valueText}>100</Text>
              <Text style={styles.propText}>FRIENDS</Text>
            </View>

            <View style={styles.itemView}>
              <Text style={styles.valueText}>100</Text>
              <Text style={styles.propText}>FANS</Text>
            </View>

          </View>
        </View>
        <ScrollView style={styles.formView} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.labelView}>
            <Text style={styles.label}>USERNAME</Text>
          </View>
          <TextInput
            style={styles.edition}  
            underlineColorAndroid='transparent'
            placeholder="Username"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            value={state.username}
            onChangeText={(value) => this.setState({username: value})}
          />
          <View style={styles.labelView}>
            <Text style={styles.label}>UPDATED PASSWORD</Text>
          </View>
          <View style={{width: '100%'}}>
            <TextInput
              style={[styles.edition, {paddingRight: 60}]}  
              underlineColorAndroid='transparent'
              placeholder="Change Password"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
              value={state.password}
              onChangeText={(value) => this.setState({password: value})}
              secureTextEntry={state.passwordhidden}
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 20, right: 50, zIndex: 1}}  
              onPress={() => {this.setState({passwordhidden: !state.passwordhidden})}}
            >
              <Text style={[styles.label, {color: '#5B0E32'}]}>{state.passwordhidden ? 'SHOW' : 'HIDE'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.labelView}>
            <Text style={[styles.label, {fontSize: 20, fontWeight: 'bold'}]}>YOUR INFORMATION</Text>
            <Text style={styles.label}>EMAIL CONNECTED TO ACCOUNT</Text>
          </View>
          <TextInput
            style={styles.edition}  
            underlineColorAndroid='transparent'
            placeholder="Email"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            value={state.email}
            onChangeText={(value) => this.setState({email: value})}
          />
          <View style={styles.labelView}>
            <Text style={styles.label}>PHONE</Text>
          </View>
          <TextInput
            style={styles.edition}  
            underlineColorAndroid='transparent'
            placeholder="Phone"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            value={state.phone}
            onChangeText={(value) => this.setState({phone: value})}
          />
          {/* <View style={styles.labelView}>
            <Text style={styles.label}>GENDER</Text>
          </View> */}
          <Dropdown
            label='GENDER'
            data={data}
            containerStyle={styles.dropdown}
          />
          <View style={styles.listView}>
            <Text style={styles.label2}>FRIENDS</Text>
            <ScrollView style={styles.listcontentView} contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}} horizontal={true}>
              {
                this.friendList.map((obj, i) => (
                  <View key={i} style={styles.item}>
                    <TouchableOpacity style={styles.delView} onPress={() => console.log('OK')}>
                      <Icon name='circle-with-plus' type='entypo' color='#521630' style={{width: 60, height: 40}} />
                    </TouchableOpacity>
                    <View style={styles.itemmainView}>
                      <View>
                        <Image source={{uri: obj.avatar}}
                          style={{ width: 40, height: 40, borderRadius: 40/2, marginBottom: 5, overflow: "hidden" }}
                        />
                      </View>
                      <Text style={[styles.valueText, {fontSize: 10}]}>{obj.name}</Text>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          </View>
          <View style={styles.listView}>
            <Text style={styles.label2}>FANS</Text>
            <ScrollView style={styles.listcontentView} contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}} horizontal={true}>
              {
                this.fanList.map((obj, i) => (
                  <View key={i} style={styles.item}>
                    <TouchableOpacity style={styles.delView}>
                      <Icon name='circle-with-plus' type='entypo' color='#521630' style={{width: 60, height: 40}} />
                    </TouchableOpacity>
                    <View style={styles.itemmainView}>
                      <View>
                        <Image source={{uri: obj.avatar}}
                          style={{ width: 40, height: 40, borderRadius: 40/2, marginBottom: 5, overflow: "hidden" }}
                        />
                      </View>
                      <Text style={[styles.valueText, {fontSize: 10}]}>{obj.name}</Text>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          </View>
          <TouchableOpacity style={{marginBottom: 50}}>
            <View style={{ width: 220, height: 38, backgroundColor: '#521630', borderRadius: 100, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 15 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={{fontSize: 10, fontWeight: 'bold', color: 'white'}}>SUBMIT CHANGES</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    alignItems: "center",
    backgroundColor: 'white'
  },
  headerView: {
    width: '100%',
    padding: width * 0.05,
    marginBottom: 30,
    marginTop: 5,
  },
    avatarView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
      imageView: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },
        addView: {
          position: 'absolute',
          width: 40,
          height: 40,
          top: 10,
          right: 20,
          borderRadius: 40/2,
          borderWidth: 3,
          borderColor: '#521630',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          backgroundColor: 'white'
        },
    detailView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
      itemView: {flex: 0.3, justifyContent: 'center', alignItems: 'center'},
        valueText: {
          fontSize: 20, color: '#000', fontWeight: 'bold', textAlign: 'center'
        },
        propText: {
          fontSize: 10, textAlign: 'center', color: 'grey'
        },
  formView: {
    width: '100%',
  },
    labelView: {
      width: '100%',
      paddingHorizontal: 20 + width * 0.07,
      marginBottom: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
      label: {
        fontSize: 12,
        color: 'grey'
      },
      label2: {
        fontSize: 14,
        color: 'grey'
      },
    edition: {
      width: '84%',
      height: 55,
      marginBottom: 15,
      borderRadius: 5,
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      color: "black",
      shadowColor: 'grey',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 4.65,
      borderTopWidth: 0,
      shadowOpacity: 0.2,
      elevation: 6,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center' 
    },
    dropdown: {
      width: '85%',
      height: 60,
      marginBottom: 25,
      shadowColor: '#D8D8D8',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10, 
      shadowOpacity: 0.9,
      elevation: 6,
      backgroundColor: 'white'
    },
    listView: {
      height: 180,
      marginBottom: 25,
      paddingVertical: 15,
      marginLeft: width * 0.07,
      paddingLeft: width * 0.05,
      shadowColor: '#D8D8D8',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10, 
      shadowOpacity: 0.9,
      elevation: 6,
      backgroundColor: 'white'
    },
    listcontentView: {
      height: 85,
      flexDirection: 'row',
    },
      item: {
        width: 145,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
        itemmainView: {
          width: '100%',
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#D8D8D8',
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 10,
          shadowOpacity: 0.9,
          elevation: 6,
          zIndex: 0,
          backgroundColor: 'white'
        },
        delView: {
          position: 'absolute',
          top: -7,
          right: -7,
          zIndex: 1,
          transform: [{ rotate: '45deg'}]
        },
});

const mapStateToProps = state => {
  return { user: state.auth.user, isLoggingOut: state.auth.isLoggingOut }
}

export default connect(mapStateToProps, actions)(Profile)

import React, { Component } from 'react'
import { View, Text, Image, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Content, Header, Body, Right, Left, Icon , Button, Footer, FooterTab } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../actions/actions'

import CommentItem from './CommentItem'

const { width, height } = Dimensions.get('window')


class Comments extends Component {

state = {
  imageUrl: this.props.imageUrl
}


  componentWillMount = () => {
    let payload = { postId: this.props.postId , postType: this.props.postType }
    this.props.getCommentsById(payload)
  }

  componentWillUnmount = () => {
    this.props.clearComment()
  }

  onBackPressed = () =>
    Actions.pop()

  onCommentInput = (input, targetId, targetType) =>
    this.props.addComment({ input, targetId, targetType })

  isDisabled = () =>
    this.props.newComment.length <= 0 ? true : false

  onCommentIntent = () => {
    console.log("PAYLOAD " + JSON.stringify({ type: this.props.postType, postId: this.props.postId, comment: this.props.newComment }))
    this.props.sendComment({ type: this.props.postType, postId: this.props.postId, comment: this.props.newComment })
    // Keyboard.dismiss()
  }


  render = () => {
    let { currentTab } = this.props
    return (
      <KeyboardAwareScrollView innerRef={(ref) => this.awareScrollView = ref }>
        <View style={{ width, height, backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#521630', paddingTop: 32, height: 80, justifyContent: 'center' }}>
           <Left>
             <Icon onPress={this.onBackPressed} name="ios-arrow-back" style={{color: 'white'}}/>
           </Left>

           <Right>
           <Icon onPress={console.log('menu clicked')} name="menu" style={{color: 'white'}}/>
           </Right>
         </Header>
         <Body>
             <Content style={{paddingTop: width > 600 ? 20 : 20}}>
              <Image
                source={{uri: this.state.imageUrl}}
                style={[styles.imageStyle, {height: width > 600 ? 350 : 250}]}
              />
            </Content>
          </Body>

          <View style={styles.reactions}>
            <View style={{paddingTop: 0}}>
              <View style={{ width: width < 600 ? 35 : 45, height: width < 600 ? 35 : 45, borderRadius: width < 600 ? 35/2 : 45/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
                <Image style={{ width: 25, height: 25 }} source={require('../assets/favorite-icon.png')}/>
              </View>
            </View>
            <View style={{paddingTop: 0, paddingLeft: 8}}>
              <TouchableOpacity onPress={this.onCommentIntent} disabled={this.isDisabled()}>
                <View style={{ width: width < 600 ? 35 : 45, height: width < 600 ? 35 : 45, borderRadius: width < 600 ? 35/2 : 45/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/comment-icon.png')}/>
                </View>
              </TouchableOpacity>
            </View>
          <View style={{paddingLeft: 10}}>
            <View style={styles.inputContainer}>

              <TextInput
                underlineColorAndroid='transparent'
                enablesReturnKeyAutomatically
                onChangeText={(input) => this.onCommentInput(input, this.props.postId, this.props.postType)}
                value={this.props.newComment}
                multiline
                placeholder="Write a comment..."
                style={styles.input}
              />

              {
                this.props.newComment.length > 0
              ?
                <Button onPress={this.onCommentIntent} disabled={this.isDisabled()} transparent style={styles.button}>
                  <Text style={styles.buttonText}>Publish</Text>
                </Button>
              :
                null
              }

            </View>
            </View>

          </View>

          <Body style={{ marginTop: width > 600 ? 14 : null }}>
            <Content style={{paddingLeft: 7}}>
              <ScrollView style={{paddingTop: 20, flexGrow: 1}}>
              {this.props.comments.map(comment =>
                <CommentItem key={comment.id} comment={comment}/>
              ).reverse()}
              </ScrollView>
            </Content>
          </Body>
          {/* <Footer style={styles.footerContainer}>
            <View style={styles.inputContainer}>

              <TextInput
                underlineColorAndroid='transparent'
                enablesReturnKeyAutomatically
                onChangeText={(input) => this.onCommentInput(input, this.props.postId, this.props.postType)}
                value={this.props.newComment}
                multiline
                placeholder="Add a comment..."
                style={styles.input}
              />

              <Button onPress={this.onCommentIntent} disabled={this.isDisabled()} transparent style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </Button>

            </View>
          </Footer> */}


            <Footer style={{ backgroundColor: '#FFF' }}>
          <FooterTab style={{ backgroundColor: '#FFF' }}>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'FEED' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab('FEED')}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'FEED' ? '#5B0E32' : '#000'}} name="home"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'LIKES' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("LIKES")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'LIKES' ? '#5B0E32' : '#000'}} name="heart"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'ADD' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("ADD")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'ADD' ? '#5B0E32' : '#000'}} name="plus"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'CHAT' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("CHAT")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'CHAT' ? '#5B0E32' : '#000'}} name="bubbles"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'PROFILE' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("PROFILE")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'PROFILE' ? '#5B0E32' : '#000'}} name="user"/>
            </Button>
          </FooterTab>
        </Footer>
        </View>
      </KeyboardAwareScrollView>
    )
  }

}

const styles = {
  footerContainer: {
    height: 65
  },
  inputContainer: {
   // width,
   width: width/1.55,
   borderColor: 'lightgray',
   borderWidth: 1,
   height: width < 600 ? 40 : 50,
   borderRadius: width < 600 ? 40/2 : 50/2,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    fontSize: 15,
    marginLeft: 32,
    width: '65%',
    backgroundColor: '#fff'
  },
  button: {
  paddingRight: 20

  },
  buttonText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: width < 600 ? 12 : 16,
    marginLeft: 4
  },
  imageStyle: {
    width: width * 0.85,
    height: 200,
    borderRadius: 5
  },
  reactions: {
    paddingLeft: width * 0.07,
    flexDirection: 'row',
    borderColor: 'white',
    position: 'relative'
  },


}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    isLoading: state.comments.isLoading,
    error: state.comments.error,
    newComment: state.comments.newComment
  }
}

export default connect(mapStateToProps, actions)(Comments)

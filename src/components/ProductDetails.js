// Actual details page 
import React, { Component } from 'react'
import { View, Text, Image, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Header, Body, Right, Left, Icon , Button, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../actions/actions'
import { Rating } from 'react-native-elements';

import Carousel from './utils/Carousel'
import Tag from './utils/Tag'
import CommentItem from './CommentItem'

const { width, height } = Dimensions.get('window')
const COMMENT_LIMIT = 60
const ON_LOAD_IMAGE = require('../assets/image-placeholder.png')

class LookInfo extends Component {

  state = {
    showComments: false,
    imageUrl: this.props.imageUrl,
    productLiked: this.props.productLiked
  };

  componentWillMount = () => {
    console.log("ID_SHOWING HERE " + this.props.id)
    this.props.getProductBy(this.props.id)
  }

  onCommentInput = (input, targetId, targetType) =>
  this.props.addComment({ input, targetId, targetType })

  isDisabled = () =>
  this.props.newComment.length <= 0 ? true : false

  onCommentIntent = () => {
  this.props.sendComment({ type: this.props.postType, postId: this.props.postId, comment: this.props.newComment })
  Keyboard.dismiss()
  }

  onbackPressed = () => {
    Actions.pop()
  }

  showCommentsfunction = () => {
    this.setState({showComments: true})
  }

  hideCommentsfunction = () => {
    this.setState({showComments: false})
  }

  renderCommentUserName = user =>
    user.email ? user.email + " " : user.name + " "

  renderCommentText = comment =>
    comment.length > COMMENT_LIMIT ? comment.substring(0, COMMENT_LIMIT).concat('...') : comment

  renderComments = comments => {
    if (comments) {
      return comments.map((comment, index) => {
          while ( index <= 4 ) {
            return (
              <CommentItem key={comment.id} comment={comment}/>
            )
          }
        }
      )
    }
  }

  renderMoreCommentsOption = (comments = null) =>
    comments && comments.length >= 4 ? true : false

  onMoreCommentsPressed = (product, isTagged) => {
    Actions.comments({  postType: 'Product', postId: product.id  })
  }


    isLookLiked = (look, likedPosts) => {
      let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
      return likedLook.length > 0 ? true : false
    }

    isProductLiked = (product, likedPosts) => {
      let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
      return likedProduct.length > 0 ? true : false
    }

  renderLikeButton = (isLiked, product) => {
    let { unlikePost, likePost, isTagged } = this.props
    return this.state.productLiked
      ?

        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
        <Image style={{ width: 25, height: 25 }} source={require('../assets/3.png')} onPress={() => unlikePost({post: product, type: 'Product'})} />
        </View>
      :
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2,backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
        <Image style={{ width: 25, height: 25 }} source={require('../assets/favorite-icon.png')} onPress={() => unlikePost({post: product, type: 'Product'})} />
        </View>
  }

  renderCommentButton = () => {
      if(!this.state.showComments){
        return (
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2,backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
        <Image style={{ width: 30, height: 30 }} source={require('../assets/comment-icon.png')} onPress={() => this.showCommentsfunction()} />
        </View>
        );
      } else {
        return (
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
        <Image style={{ width: 30, height: 30 }} source={require('../assets/comment-icon.png')} onPress={() => this.showCommentsfunction()} />
        </View>
        );
      }
  }

  render = () => {
    if (this.props.product.images) {
      console.log("PRODUCT " + JSON.stringify(this.props.product.images[0]))
    }
      return(
        <View style={styles.container}>
        <Header style={{height: width > 600 ? 80 : 70, paddingTop: 16, backgroundColor: '#602438'}}>
          <Left>
          <Icon onPress={() => this.onbackPressed()} name="ios-arrow-back" style={{color: 'white', fontSize: width > 600 ? 22 : 22, paddingLeft: 16}}/>
          </Left>

          <Right>
          <Icon onPress={console.log('menu clicked')} name="menu" style={{color: 'white', fontSize: width > 600 ? 22 : 22, paddingRight: 16}}/>
          </Right>
        </Header>
          <View style={{alignSelf: 'center', paddingTop: 25}}>
          <Image
            source={{uri: this.state.imageUrl}}
            style={[styles.imageStyle, {height: width > 600 ? 350 : 250}]}
          />

            {/* <Image loadingIndicatorSource={ON_LOAD_IMAGE} source={{uri: 'http://ingridbellaguarda.com/wp-content/uploads/2017/02/Make-Social5.jpg'}} style={{width: width * 0.87, height: width * 0.5, borderRadius: 10 }}/> */}
            {/* {
              post.tags
              ?
                <Button onPress={() => console.log('foo')} transparent style={styles.button}>
                  <Text style={styles.buttonText}>Publish</Text>
                </Button>
              :
                null
            } */}
          </View>
          <View style={styles.container}>
          <Rating
          showRating
          type="star"
          ratingCount={3}
          fractions={1}
          startingValue={2}
          readonly
          imageSize={40}
          onFinishRating={this.ratingCompleted}
          onStartRating={this.ratingStarted}
          style={{ paddingVertical: 10 }}
          />
          </View>
          <View style={{flexDirection: 'row', paddingTop: width > 600 ? 25 : 15}}>
            <View style={[styles.options, {paddingLeft: width * 0.051}]}>
            {this.renderLikeButton(this.isProductLiked(this.props.product, this.props.likedPosts), this.props.product)}
            <View style={{paddingHorizontal:3}}></View>
            {this.renderCommentButton()}
            {/* <Icon onPress={() => this.showCommentsfunction()} name="chat-bubble" type="MaterialIcons" style={styles.optionsIcon}/> */}
            {/* <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
              <Icon  onPress={() => this.showCommentsfunction()} name="ios-chatboxes" style={{ fontSize: 16, color: 'white', marginTop: 2.5 }}/>
            </View> */}
            <View style={{paddingHorizontal: 3}}></View>
            <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                enablesReturnKeyAutomatically
                onChangeText={(input) => this.onCommentInput(input, this.props.id, 'Product')}
                value={this.props.newComment}
                multiline
                placeholder="Write a comment..."
                style={styles.input}
              />
              </View>
            </View>

          </View>
          <ScrollView style={{ width, height: 350, marginTop: 15 }}>
            {this.renderComments(this.props.product.comments)}
          </ScrollView>
          <TouchableWithoutFeedback onPress={() => Actions.nearbyStores()}>
          <View style={{ position: 'absolute', right: 32, bottom: 32, width: 120, height: 45, backgroundColor: '#521630', borderRadius: 45/2, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 15 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', elevation: 4 }}>
            <Text style={{ color: '#FFF' }}>Buy now</Text>
          </View>
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

const styles = {
  container: {
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  descriptionContainer: {
    margin: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  itemTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 4
  },
  itemData: {
    fontSize: width > 600 ? 22 : 16,
    marginTop: 2,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#521630'
  },
  commentsContainer: {
    width: width,
    height: 'auto',
    padding: 16
  },
  commentsSectionTitle: {
    marginBottom: 16
  },
  commentText: {
    marginBottom: 8
  },
  userNameOnComments: {
    fontWeight: 'bold'
  },
  seeMoreContainer: {
    width: 'auto',
    height: 'auto'
  },
  seeMoreText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#521630'
  },
  options: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionsIcon: {
    color: 'purple',
    marginLeft: 16,
    fontSize: 32,
  },
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
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.product.isLoading,
    error: state.product.error,
    likedPosts: state.likes.likedPosts,
    // comments: state.comments.comments,
    newComment: state.comments.newComment,
    product: state.product.data
  }
}

export default connect(mapStateToProps, actions)(LookInfo)

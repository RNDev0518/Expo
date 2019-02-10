// Main look details
import React, { Component } from 'react'
import { View, Text, Image, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Header, Body, Right, Left, Icon , Button, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../actions/actions'

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
    lookLiked: this.props.lookLiked



  };

  componentWillMount = () => {
    console.log('POST ' + JSON.stringify(this.props.post))
    if (this.props.post.tags && this.props.post.tags.length > 0) {
      this.setState({ showComments: false })
    } else {
      this.setState({ showComments: true })
    }
    // let payload = { postId: this.props.postId , postType: this.props.postType }
    // this.props.getCommentsById(payload)
  }

  // componentWillUnmount = () => {
  //   this.props.clearComment()
  // }

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
    /*if (!comments) {
      return null
    }*/
    return comments.map((comment, index) => {
        while ( index <= 4 ) {
          return (
            <CommentItem key={comment.id} comment={comment}/>
          )
        }
      }
    )
  }

  renderMoreCommentsOption = (comments = null) =>
    comments && comments.length >= 4 ? true : false

  onMoreCommentsPressed = (look, isTagged) => {
    Actions.comments({  postType: 'Look', postId: look.id  })
  }

  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }

  renderLikeButton = (isLiked, look) => {
    let { unlikePost, likePost, isTagged } = this.props
    return this.state.lookLiked
      ?

        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
          <Image style={{ width: 25, height: 25 }} source={require('../assets/3.png')} onPress={() => unlikePost({post: look, type: 'Look'})} />
        </View>
      :
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
          <Image style={{ width: 25, height: 25 }} source={require('../assets/favorite-icon.png')} onPress={() => unlikePost({post: look, type: 'Look'})} />
        </View>
  }

  renderCommentButton = () => {


      if(!this.state.showComments){
        return (
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',  }}>
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
    // console.log(JSON.stringify(post.tags))
    let matrixWidth
    let matrixHeight
    let { look, isTagged, likedPosts, post } = this.props
    let { isLookLiked } = this
    if(!this.props.isLoading) {
      if (post.matrixBase) {
        let matrixBase = post.matrixBase.split("x")
        matrixWidth = parseInt(matrixBase[0])
        matrixHeight = parseInt(matrixBase[1])
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
          <Text> @username </Text>
          <Image
            source={{uri: this.state.imageUrl}}
            style={[styles.imageStyle, {height: width > 600 ? 350 : 250}]}
          />
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
          <View style={{flexDirection: 'row', paddingTop: width > 600 ? 25 : 15}}>
            <View style={[styles.options, {paddingLeft: width * 0.051}]}>
            {this.renderLikeButton()}
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
                onChangeText={(input) => this.onCommentInput(input, this.props.postId, this.props.postType)}
                value={this.props.newComment}
                multiline
                placeholder="Write a comment..."
                style={styles.input}
              />
              </View>
            </View>

          </View>
          {
            this.state.showComments
          ?
          <ScrollView style={{ width, height: 350, marginTop: 15 }}>
            {this.renderComments(post.comments)}
          </ScrollView>
          :
          <View>
          <ScrollView style={{ width, height: 300, marginTop: 25 }}>
            {post.tags.map(tag => {
              return (
                <TouchableWithoutFeedback key={tag.id} onPress={() => Actions.productInfo({ id: tag.product.id, imageUrl:tag.images[0].url  })}>
                <View style={{ width: '100%', height: width > 600 ? 145 : 130, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ elevation: 8, width: width > 600 ? 125 : 100, height: width > 600 ? 125 : 100, backgroundColor: '#FFF', borderRadius: 10, marginLeft: 36 }}>
                    <Image source={{ uri: `https://ibthumbor.herokuapp.com/unsafe/400x400/${tag.images[0].url}` }} style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'contain' }}/>
                  </View>

                  <View style={{ marginLeft: 24 }}>
                    <View style={{marginBottom: width > 600 ? 28 : 14}}>
                      <Text style={{ fontWeight: 'bold', fontSize: width > 600 ? 20 : 14}}>{tag.product.name}</Text>
                      <Text style={{ color: 'lightgray', fontSize: width > 600 ? 16 : 11, fontWeight: 'bold' }}>{tag.product.pallete}</Text>
                    </View>
                  <Text multiline style={{ color: '#602438', fontSize: width > 600 ? 25 : 12, fontWeight: 'bold', width: '50%' }}>{tag.product.description}</Text>
                  </View>

                  <Icon name='ios-heart-outline' style={{ fontSize: width > 600 ? 32 : 28, color: '#602438', position: 'absolute', right: 24, top: 24 }}/>

                </View>
                </TouchableWithoutFeedback>
              )
            })}


          </ScrollView>
          </View>
          }
        </View>
      )
    } else {
      return null
    }
  }

  // render = () => {
  //   let matrixWidth
  //   let matrixHeight
  //   let { look, isTagged, likedPosts, post } = this.props
  //   let { isLookLiked } = this
  //   if(!this.props.isLoading) {
  //     if (post.matrixBase) {
  //       let matrixBase = post.matrixBase.split("x")
  //       matrixWidth = parseInt(matrixBase[0])
  //       matrixHeight = parseInt(matrixBase[1])
  //     }

  //     return(
  //       <ScrollView style={styles.container}>
  //         <View>
  //           <Image loadingIndicatorSource={ON_LOAD_IMAGE} source={{uri: `http://192.168.1.120:8888/unsafe/1000x1000/${post.imageUrl}`}} style={{width: width, height: 400.2, backgroundColor: 'grey'}}/>
  //           {
  //             post.tags
  //             ?
  //             post.tags.map(tag =>
  //               <Tag
  //                 key={tag.product.id}
  //                 product={tag.product}
  //                 showOnly
  //                 xAxisPosition={tag.leftPositioning}
  //                 yAxisPosition={tag.topPositioning}
  //               />
  //             )
  //             :
  //               null
  //           }
  //         </View>
  //         <View style={styles.options}>
  //           {this.renderLikeButton(isLookLiked(post, likedPosts), post)}
  //         </View>
  //         <View key={post.id} style={styles.descriptionContainer}>
  //           <Text style={styles.title}>Look Details</Text>
  //           <Text style={styles.itemData}>{post.name}</Text>
  //         </View>

  //         <View style={styles.commentsContainer}>
  //           <View style={styles.commentsSectionTitle}>
  //             <Text style={styles.title}>Comments</Text>
  //           </View>
  //           {this.renderComments(post.comments)}
  //           {
  //             this.renderMoreCommentsOption(post.comments)
  //             ?
  //             <Button onPress={() => this.onMoreCommentsPressed(post, isTagged)} transparent style={styles.seeMoreContainer}>
  //               <Text style={styles.seeMoreText}>See more comments</Text>
  //             </Button>
  //             :
  //             null
  //           }
  //         </View>

  //       </ScrollView>
  //     )
  //   } else {
  //     return null
  //   }
  // }
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
    isLoading: state.look.isLoading,
    error: state.look.error,
    likedPosts: state.likes.likedPosts,
    comments: state.comments.comments,
    isLoading: state.comments.isLoading,
    error: state.comments.error,
    newComment: state.comments.newComment
  }
}

export default connect(mapStateToProps, actions)(LookInfo)

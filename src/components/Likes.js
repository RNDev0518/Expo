import React, { Component } from 'react'
import { View, ScrollView, Text, Image, Dimensions, ActivityIndicator, FlatList, TouchableWithoutFeedback, Alert } from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

import LikedPost from './LikedPost'
import PostItem from './PostItem'

const { width, height } = Dimensions.get('window')

class Likes extends Component {

  likeButton = isLiked => {
    if (isLiked) {
      return {
        width: 25, height: 25, marginTop: 2.5,
      }
    } else {
      return {
        width: 25, height: 25, marginTop: 2.5
      }
    }
  }

  backgroundButton = isLiked => {
    if (isLiked) {
      return {
        width: width > 600 ? 45 : 30, height: width > 600 ? 45 : 30, borderRadius: width > 600 ? 45/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'      }
    } else {
      return {
        width: width > 600 ? 45 : 30, height: width > 600 ? 45 : 30, borderRadius: width > 600 ? 45/2 : 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'
      }
    }
  }

  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }

  isProductLiked = (product, likedPosts) => {
    let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
    return likedProduct.length > 0 ? true : false
  }

  onMoreCommentsPressed = (post, isTagged) => {
    let type = isTagged ? 'Look' : 'Product'
    Actions.comments({  postType: type, postId: post.id  })
  }

  onPostPress = (post, isTagged, imageUrl) =>
    isTagged ? Actions.lookInfo({id: post.id, post: post, imageUrl: imageUrl, lookLiked:true }) : Actions.productInfo({ post: post, imageUrl: imageUrl, productLiked:true })


  renderPost = ({ item, index }) => {

    let item1type = item[0].tags ? 'Look' : 'Product'

    let item2type
    if (item[1]) {
      item2type = item[1].tags ? 'Look' : 'Product'
    }

    return (
      <View style={{ width, height: width > 600 ? 380 : 250, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
      <TouchableWithoutFeedback onPress={() => this.onPostPress(item[0], item[0].tags ? true : false, this.renderImageURL(item[0]) )}>
        <View style={{width: width * 0.40, height: '90%'}}>

        <View style={{width: '100%', height: '75%'}}>
          <Image source={{ uri: this.renderImageURL(item[0]) }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>

          {
            item1type === 'Look'
            ?
            this.isLookLiked(item[0], this.props.likedPosts) ? <View style={{ position: 'absolute',  top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
            :
            this.isProductLiked(item[0], this.props.likedPosts) ? <View style={{ position: 'absolute',  top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
          }

        </View>

         <View style={{ backgroundColor: '#FFF', width: '90%', height: '20%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 40/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../assets/cart-icon.png')} />
          </View>
          <View
          style={ this.backgroundButton( item1type === 'Look' ? this.isLookLiked(item[0], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) }
          // style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}
          >
          <TouchableWithoutFeedback onPress={() => {
            item1type === 'Look'
                ?
                this.isLookLiked(item[0], this.props.likedPosts) ? this.props.unlikePost({post: item[0], type: item1type}) : this.props.likePost({post: item[0], type: item1type})
                :
                this.isProductLiked(item[0], this.props.likedPosts) ? this.props.unlikePost({post: item[0], type: item1type}) : this.props.likePost({post: item[0], type: item1type})
          }}>

            <Image
              style={ this.likeButton( item1type === 'Look' ? this.isLookLiked(item[0], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) }
              source={ item1type === 'Look' ? this.isLookLiked(item[0], this.props.likedPosts) ?  require('../assets/3.png') : require('../assets/favorite-icon.png')
                      :
                      this.isProductLiked(item[0], this.props.likedPosts) ?  require('../assets/3.png') : require('../assets/favorite-icon.png')

              }
            />
          </TouchableWithoutFeedback>
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableWithoutFeedback
              onPress={() => Actions.comments( { postId: item[0].id, postType: item1type ,imageUrl: this.renderImageURL(item[0]) }) }
            >
              <Image style={{ width: 30, height: 30 }} source={require('../assets/comment-icon.png')}/>
            </TouchableWithoutFeedback>
          </View>
        </View>

        </View>
        </TouchableWithoutFeedback>

        { item[1]
        ?
        <TouchableWithoutFeedback onPress={() => this.onPostPress(item[1], item[1].tags ? true : false, this.renderImageURL(item[0]) )}>
        <View style={{width: width * 0.40, height: '90%'}}>

        <View style={{ width: '100%', height: '75%' }}>
          <Image source={{ uri: this.renderImageURL(item[1]) }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>
          {
            item2type === 'Look'
            ?
            this.isLookLiked(item[1], this.props.likedPosts) ? <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
            :
            this.isProductLiked(item[1], this.props.likedPosts) ? <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
          }
        </View>

        <View style={{ backgroundColor: '#FFF', width: '90%', height: '20%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 40/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: 35, height: 35 }} source={require('../assets/cart-icon.png')} />
          </View>
          <View
          style={ this.backgroundButton( item1type === 'Look' ? this.isLookLiked(item[1], this.props.likedPosts) : this.isProductLiked(item[1], this.props.likedPosts) ) }
          // style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}
          >
          <TouchableWithoutFeedback onPress={() => {
            item1type === 'Look'
                ?
                this.isLookLiked(item[1], this.props.likedPosts) ? this.props.unlikePost({post: item[1], type: item1type}) : this.props.likePost({post: item[1], type: item1type})
                :
                this.isProductLiked(item[1], this.props.likedPosts) ? this.props.unlikePost({post: item[1], type: item1type}) : this.props.likePost({post: item[1], type: item1type})
          }}>
          <Image
            style={ this.likeButton( item1type === 'Look' ? this.isLookLiked(item[1], this.props.likedPosts) : this.isProductLiked(item[1], this.props.likedPosts) ) }
            source={ item1type === 'Look' ? this.isLookLiked(item[1], this.props.likedPosts) ?  require('../assets/3.png') : require('../assets/favorite-icon.png')
                    :
                    this.isProductLiked(item[1], this.props.likedPosts) ?  require('../assets/3.png') : require('../assets/favorite-icon.png')

            }
          />
          </TouchableWithoutFeedback>
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableWithoutFeedback
              onPress={() => Actions.comments( { postId: item[1].id, postType: item1type ,imageUrl: this.renderImageURL(item[1]) }) }
            >
              <Image style={{ width: 30, height: 30 }} source={require('../assets/comment-icon.png')}/>
            </TouchableWithoutFeedback>
          </View>
        </View>

        </View>
        </TouchableWithoutFeedback>
        :
        null
        }
      </View>
    )
  }

  renderImageURL = item => {
    if (item.images) {
      if (item.images[0]) {
        return item.images[0].url
      } else {
        return " "
      }
    } else {
      return (item.imageUrl)
    }
  }

  chunkResponse = (desiredNumber, targetArray) => {
    let newlyArray = []
    targetArray
      .map((element, index) =>
      (index % desiredNumber === 0 )
      ?
        newlyArray.push([element])
      :
        newlyArray[newlyArray.length - 1].push(element)
      )
    return newlyArray
  }

  render = () => {
    let { likedPosts } = this.props
      return(
        <View style={{ width, height, marginBottom: '30%' }}>
          {
            likedPosts.length > 0
            ?
            <View style={{paddingBottom: height * 0.1}}>
            <FlatList
                numColumns={2}
                data={this.chunkResponse(2, likedPosts)}
                keyExtractor={(o, i) => i.toString()}
                renderItem={this.renderPost}
              />
              {/* <ScrollView>
                {
                  likedPosts.map((post, index) =>
                    <PostItem
                      key={index}
                      post={post}
                      isTagged={post.tags ? true : false}
                    />
                  )
                }
              </ScrollView> */}
            </View>
            :
            <Text style={{alignSelf: 'center', marginTop: 32}}>No likes until now</Text>
          }
        </View>
      )
  }
}

const mapStateToProps = state => {
  return { likedPosts: state.likes.likedPosts }
}

export default connect(mapStateToProps, actions)(Likes)

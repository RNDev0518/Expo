import React, { Component } from 'react'
import { ScrollView, Text, Dimensions, StyleSheet,View, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList, Alert, Button } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

import PostItem from './PostItem'

class Feed extends Component {

  state = {
    scrollSpread: 0
  }

  likeButton = isLiked => {
    if (isLiked) {
      return {
        width: 25, height: 25, marginTop: 2.5
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


  componentWillMount = () =>
    this.props.getFeed()


  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }

  isProductLiked = (product, likedPosts) => {
    let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
    return likedProduct.length > 0 ? true : false
  }

  onPostPress = (post, isTagged, imageUrl, liked) =>
    isTagged ? Actions.lookInfo({id: post.id, post: post, imageUrl: imageUrl, lookLiked:liked}) : Actions.productInfo({ post: post, imageUrl: imageUrl, productLiked:liked })





  renderPost = ({ item, index }) => {

    let item1type = item[0].tags ? 'Look' : 'Product'
    let item2type = item[1].tags ? 'Look' : 'Product'
    return (
      <View style={{ width, height: width > 600 ? 380 : 250, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
        <View style={{width: width * 0.40, height: '90%'}}>

        <TouchableWithoutFeedback onPress={() =>

          item1type === 'Look'
          ?
          this.isLookLiked(item[0], this.props.likedPosts) ?
               this.onPostPress(item[0], item[0].tags ? true : false, this.renderImageURL(item[0]) , true )
               :
               this.onPostPress(item[0], item[0].tags ? true : false, this.renderImageURL(item[0]), false )

          :
          this.isProductLiked(item[0], this.props.likedPosts) ?
           this.onPostPress(item[0], item[0].tags ? true : false, this.renderImageURL(item[0]) , true )
           :
           this.onPostPress(item[0], item[0].tags ? true : false, this.renderImageURL(item[0]), false )


           }>
        <View style={{width: '100%', height: '75%'}}>
          <Image source={{ uri: `https://ibthumbor.herokuapp.com/unsafe/500x500/${this.renderImageURL(item[0])}` }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>
          {
            item1type === 'Look'
            ?
            this.isLookLiked(item[0], this.props.likedPosts) ? <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
            :
            this.isProductLiked(item[0], this.props.likedPosts) ? <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
          }

        </View>
        </TouchableWithoutFeedback>


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

        <View style={{width: width * 0.40, height: '90%'}}>

        <TouchableWithoutFeedback
        onPress={() =>

          item1type === 'Look'
          ?
          this.isLookLiked(item[1], this.props.likedPosts) ?
               this.onPostPress(item[1], item[1].tags ? true : false, this.renderImageURL(item[1]) , true)
               :
               this.onPostPress(item[1], item[1].tags ? true : false, this.renderImageURL(item[1]), false)

          :
          this.isProductLiked(item[1], this.props.likedPosts) ?
           this.onPostPress(item[1], item[1].tags ? true : false, this.renderImageURL(item[1]) , true )
           :
           this.onPostPress(item[1], item[1].tags ? true : false, this.renderImageURL(item[1]), false )


           }>


          <View style={{ width: '100%', height: '75%' }}>
            <Image source={{ uri: `https://ibthumbor.herokuapp.com/unsafe/500x500/${this.renderImageURL(item[1])}` }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>
            {
              item2type === 'Look'
              ?
              this.isLookLiked(item[1], this.props.likedPosts) ? <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
              :
              this.isProductLiked(item[1], this.props.likedPosts) ? <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null
            }
          </View>
        </TouchableWithoutFeedback>

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
    console.log(JSON.stringify(targetArray))
    console.log('Rendering again with post type ' + this.props.postTypeDisplayed)
    let newlyArray = []
    targetArray
      .filter(element => element.type === this.props.postTypeDisplayed)
      .map((element, index) =>
      (index % desiredNumber === 0 )
      ?
        newlyArray.push([element])
      :
        newlyArray[newlyArray.length - 1].push(element)
      )
    return newlyArray
  }
// Main button function in Feed
_onPressButton() {
  Alert.alert('You tapped the button!')
}
  render = () => {
    let { isLoading, data, likedPosts, likePost, unlikePost } = this.props
    if (!isLoading) {
      if (data) {
        return(
          <View>
          <ScrollView style={{ width, height }} onScroll={(event) => this.setState({ scrollSpread: event.nativeEvent.contentOffset.y })}>

            <View style={{ width: '100%', height: (height * 0.25) ,flexDirection: 'row',  alignItems: 'center'}} >

                <Image source={{uri: "https://www.beautips.info/wp-content/gallery/make-up/angelina_jolie_9.jpg"}} style={{ width: 120, height: 120, borderRadius: 120/2,  overflow: "hidden", borderWidth: 3, shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, marginLeft: 20 }}/>
			        <View style={{ width: '40%', height: '70%', justifyContent: 'space-around', paddingLeft: 20 }}>
			        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>@username</Text>
              <TouchableOpacity
                style={styles.button}
                 onPress={this._onPressButton}
               >
               <Text> Follow </Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.button}
              onPress={this._onPressButton}
              >
              <Text> Send Message </Text>
              </TouchableOpacity>

              </View>
			</View>
              <View style={{ width: '100%', height: '5%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

                <View style={{ width: '30%', height: 'auto', borderRightWidth: 0.5, borderColor: 'grey' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>100</Text>
                  <Text style={{fontSize: 8, textAlign: 'center', color: 'grey'}}>LOOKS</Text>
                </View>

                <View style={{ width: '30%', height: 'auto', borderRightWidth: 0.5, borderColor: 'grey' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>100</Text>
                  <Text style={{fontSize: 8, textAlign: 'center', color: 'grey'}}>FRIENDS</Text>
                </View>

                <View style={{ width: '30%', height: 'auto' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>100</Text>
                  <Text style={{fontSize: 8, textAlign: 'center', color: 'grey'}}>FANS</Text>
                </View>

              </View>


              <View style={{ width: '100%', height: height * 0.30,justifyContent: 'space-around' }}>
              <TouchableWithoutFeedback onPress={() => this.props.selectTab("LOOK_ADD")}>
                <View style={{ width: 300, height: 60, backgroundColor: '#521630', borderRadius: 85/2, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 15 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                  <Image source={require('../assets/instalookit-image.png')} style={{ height: '90%', width: '90%', borderRadius: 72.25/2, resizeMode: 'contain' }}/>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ width: '100%', height: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                <TouchableWithoutFeedback onPress={() => this.props.changePostDisplayedTo('Look')}>
                  <View style={{ width: 150, height: 60, backgroundColor: '#FFF', flexDirection: 'row',  shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', borderRadius: 10}}>
                    <View style={{ width: 6.5, height: 35, backgroundColor: '#521630', borderRadius: 35/2 }}></View>
                    <Text style={{ fontSize: 12, color: '#521630', marginHorizontal: 16, fontWeight: 'bold' }}>Browse Looks</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.props.changePostDisplayedTo('Product')}>
                  <View style={{ width: 150, height: 60, backgroundColor: '#FFF', flexDirection: 'row',  shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', borderRadius: 10}}>
                    <View style={{ width: 6.5, height: 35, backgroundColor: '#521630', borderRadius: 35/2 }}></View>
                    <Text style={{ fontSize: 12, color: '#521630', marginHorizontal: 16, fontWeight: 'bold' }}>Browse Products</Text>
                  </View>
                </TouchableWithoutFeedback>

              </View>

            </View>

            <FlatList
                numColumns={2}
                data={this.chunkResponse(2, data)}
                keyExtractor={(o, i) => i.toString()}
                renderItem={this.renderPost}
              />

          </ScrollView>
          {
            this.state.scrollSpread >= 250
            ?
            <TouchableWithoutFeedback onPress={() => this.props.selectTab("LOOK_ADD")}>
                <View style={{ position: 'absolute', right: 32, bottom: 16, width: 90, height: 45, backgroundColor: '#521630', borderRadius: 45/2, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 15 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', elevation: 4 }}>
                  <Image source={require('../assets/instalookit-image.png')} style={{ height: '90%', width: '90%', borderRadius: 45/2, resizeMode: 'contain' }}/>
                </View>
            </TouchableWithoutFeedback>
            :
            <Icon name='ios-arrow-down' style={{ fontSize: 32, position: 'absolute', right: 32, bottom: 16 }}/>
          }
          </View>
        )
      }
    } else {
      return <View><Text>Loading..</Text></View>
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderWidth: 2
    },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})

const mapStateToProps = state => {
  return {
    data: state.feed.data,
    isLoading: state.feed.isLoading,
    error: state.feed.error,
    likedPosts: state.likes.likedPosts,
    userWantsToSeeFeed: state.feed.userWantsToSeeFeed,
    clicked: state.likes.clicked,
    postTypeDisplayed: state.feed.postTypeDisplayed
  }
}

export default connect(mapStateToProps, actions)(Feed)

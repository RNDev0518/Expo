import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'


const { width, height } = Dimensions.get('window')

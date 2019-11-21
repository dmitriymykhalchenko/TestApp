import React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {incrementCounter, decrementCounter} from './client/redux/actions';
import {connect} from 'react-redux';
import HomeScreen from './client/screens/HomeScreen';
import DetailsScreen from './client/screens/DetailsScreen';
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

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
import {incrementCounter, decrementCounter} from '../redux/actions';
import {connect} from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  }

  render() {
    const {params} = this.props.navigation.state;
    //const dataSource = params ? params.dataSource : null;
    //console.log('this.state.dataSource ', dataSource);
    return (
      <View style={styles.detView}>
        <Image style={styles.imageBig} source={{uri: this.props.saveItem.urls.full}} />
        {this.state.isLoading && (
          <View style={styles.active}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondcontainer: {
    flex: 1,
    paddingTop: 20,
  },
  touch: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 220,
    margin: 10,
    justifyContent: 'center',
  },
  text: {
    width: 100,
    textAlign: 'center',
  },
  detView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBig: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  active: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function mapStateToProps(state) {
  return {
    counter: state.appData.get('counter'),
    saveItem: state.appData.get('saveItem'),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    incrementCounter() {
      dispatch(incrementCounter());
    },
    decrementCounter() {
      dispatch(decrementCounter());
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsScreen);

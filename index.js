import {AppRegistry, AsyncStorage, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {Provider} from 'react-redux';
import throttle from 'lodash/throttle';
import {SERIALIZE_STATE_INTERVAL} from './client/utils/constants';
import createStore from './client/configs/store';
//import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
import HomeScreen from './client/screens/HomeScreen';
import DetailsScreen from './client/screens/DetailsScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  },
);
const AppContainer = createAppContainer(RootStack);

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    // this helps us to save global state in phone memory in order to save it between app sessions
    const init = initialState => {
      this._store = createStore({appData: initialState});
      const {dispatch} = this._store;
      //save selected state entries to the local storage
      this._store.subscribe(
        throttle(() => {
          const data = this._store.getState().appData;
          if (data) {
            const counter = data.get('counter');
            saveState({
              counter,
              // here you can add something alse
            });
          }
        }, SERIALIZE_STATE_INTERVAL),
      );
      this.setState({isLoading: false});
    };

    loadState()
      .then(state => {
        init(state);
      })
      .catch(e => {
        console.log('loadState error - ', e);
        //init with hydrated state
        init();
      });
  }

  render() {
    if (this.state.isLoading) {
      // we need to wait untill we load state from phone memory
      return (
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'lightgray'}}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <Provider store={this._store}>
          <AppContainer />
        </Provider>
      );
    }
  }
}

const STATE = 'STATE';
const saveState = state => {
  return AsyncStorage.setItem(STATE, JSON.stringify(state));
};
const loadState = () => {
  return AsyncStorage.getItem(STATE).then(raw => {
    return JSON.parse(raw);
  });
};
AppRegistry.registerComponent(appName, () => Application);

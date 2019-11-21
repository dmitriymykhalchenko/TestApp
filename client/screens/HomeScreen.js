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
import {incrementCounter, decrementCounter, saveItem} from '../redux/actions';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'HomeScreen',
      headerStyle: {
        backgroundColor: '#f2f2f2',
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
      headerRight: <TouchableOpacity style={{height: 60, width: 60}} />,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          () => {},
        );
        console.log('responseJson ', responseJson);
      })
      .catch(error => {
        throw error;
        console.error(error);
      });
  }

  render() {
    //const { navigate } = this.props.navigation;
    // const {navigation} = this.props;
    const DATA = this.state.dataSource;
    return (
      <View style={styles.container}>
        <View style={styles.secondcontainer}>
          <FlatList
            data={DATA}
            renderItem={({item, index}) => (
              <View style={styles.touch}>
                <TouchableOpacity
                  //     onPress={() =>
                  // this.props.navigation.navigate('Details', {
                  //         dataSource: item,
                  //       })
                  //     }
                  onPress={() => {
                    this.props.saveItem(item);
                    this.props.navigation.navigate('Details');
                  }}>
                  <Image style={styles.image} source={{uri: item.urls.small}} />
                </TouchableOpacity>
                <Text style={styles.text}>{item.user.name}</Text>
              </View>
            )}
            keyExtractor={({id}, index) => id}
          />
        </View>
        {/*<View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{margin: 20, padding: 20, backgroundColor: 'lightblue'}}
            onPress={() => this.props.incrementCounter()}>
            <Text>+1</Text>
          </TouchableOpacity>

          <Text style={{margin: 20}}>{'Counter = ' + this.props.counter}</Text>

          <TouchableOpacity
            style={{margin: 20, padding: 20, backgroundColor: 'lightblue'}}
            onPress={() => this.props.decrementCounter()}>
            <Text>-1</Text>
          </TouchableOpacity>
        </View>*/}
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
    saveItem(value) {
      dispatch(saveItem(value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

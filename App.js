import React from 'react';
import { Button, View, Text, FlatList, StyleSheet, ActivityIndicator, Image,TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch(
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
    const {navigation} = this.props;
    const DATA = this.state.dataSource;
    return (
      <View style={styles.container}>
        <View style={styles.secondcontainer}>
          <FlatList
            data={DATA}
            renderItem={({item, index}) => (
              <View style={styles.touch}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Details', {
                      dataSource: item,
                    })
                  }>
                  <Image style={styles.image} source={{uri: item.urls.small}} />
                </TouchableOpacity>
                <Text style={styles.text}>{item.user.name}</Text>
              </View>
            )}
            keyExtractor={({id}, index) => id}
          />
        </View>
      </View>
    );
  }
}

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

    const dataSource = params ? params.dataSource : null;
    console.log('this.state.dataSource ', dataSource);

    return (
      <View style={styles.detView}>
        <Image style={styles.imageBig} source={{uri: dataSource.urls.full}} />
        {this.state.isLoading && (
          <View style={styles.active}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

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

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

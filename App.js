/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from './reducers/index'
import History from './components/History'
import {createTabNavigator, createStackNavigator} from 'react-navigation';
import {purple, white} from "./utils/colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EnteryDetails from './components/EntryDetail';

function UdaciStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: 20}}>
      <StatusBar translucent backgoundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({tintColor}) => <FontAwesome name='ios-bookmarks' size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions:{
    header:null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = createStackNavigator({
  Home:{
    screen: Tabs,
    navigationOptions :{
      header: null,
    }
  },
  EntryDetail : {
    screen: EnteryDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle : {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {


  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}


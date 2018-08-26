import React from 'react';
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native';
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers';
import UdaciStepper from './UdaciStepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'

import Ionicons from 'react-native-vector-icons/Ionicons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from "../utils/api";
import {connect} from 'react-redux'
import {addEntry} from "../actions";
import {purple, white} from "../utils/colors";


function SubmitButton({onPress}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends React.Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const {max, step} = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  };

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }))
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    console.log(JSON.stringify(entry));

    this.props.dispatch(addEntry({
        [key]: entry
      }));


    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    //TODO navigate home

    submitEntry({key, entry})

    //TODO clear local notifications
  };

  reset = () => {
    const key = timeToString();

    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    //TODO: route to home

    removeEntry(key
    )

  };

  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                    size={100}/>
          <Text>You already logged your information for today</Text>
          <TextButton style={{padding: 10}} onPress={this.reset} children={'Reset'}/>

        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date().toLocaleString())}/>
        {Object.keys(metaInfo).map((key) => {
          const {getIcon, type, ...rest} = metaInfo[key];
          const value = this.state[key];
          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}/>
                : <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}/>}
            </View>
          )
        })}
        <SubmitButton onPress={this.submit}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginRight: 40,
    marginLeft: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    height: 45,
    marginRight: 30,
    marginLeft: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,

  }

})

function mapStateToProps(state){
  const key = timeToString();
  return {
    alreadyLogged : state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry);
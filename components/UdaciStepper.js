import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

export default function UdaciStepper({max, units, step, value, onIncrement, onDecrement}){
  return (
    <View>
      <View>
      <TouchableOpacity onPress={onDecrement}>
        <FontAwesome name='minus' size={30} color={'black'}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onIncrement}>
        <FontAwesome name='plus' size={30} color={'black'}/>
      </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{units}</Text>
      </View>
    </View>
  )
}
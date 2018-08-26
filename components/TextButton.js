import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {purple, white} from "../utils/colors";


export default function TextButton({children, onPress, style={}}){
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.reset, style]}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  reset:{
    textAlign: 'center',
    color: purple,
  }
})
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
/**
 * @function
 * @param {string} key - key of the AsyncStorage
 */
export const getStorage = (key) => {
  try {
    AsyncStorage.getItem(key).then((val) => {
      return val
    })
  } catch(e) {
    return Alert.alert(e)
  }
}

/**
 * @function
 * @param {string} key - key of the AsyncStorage
 * @param {string} value - value of the AsyncStorage
 */
export const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    return Alert.alert(e)
  }
}

/**
 * @function
 * @param {string} key - key of the AsyncStorage
 */
export const removeStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    return Alert.alert(e)
  }
}
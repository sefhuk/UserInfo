import { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { textStyle, containerStyle } from '../../config/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const getUserName = async () => {
    try {
      await AsyncStorage.getItem('user', (err, result) => {
        setName(JSON.parse(result));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout');
      navigation.replace('Splash');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <SafeAreaView style={containerStyle}>
      <View>
        <Text style={textStyle}>{`${name.name}님 안녕하세요`}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: 'white',
            height: 50,
            marginTop: 100,
          }}
          onPress={handleLogout}
        >
          <Text style={textStyle}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

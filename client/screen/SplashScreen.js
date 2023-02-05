import { useEffect } from 'react';
import { View, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyle } from '../config/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { HTTP_HOST } from '@env';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('user').then((result) => {
      if (!result) {
        navigation.replace('Auth');
      } else {
        try {
          axios
            .post(
              `${HTTP_HOST}/account/tokenVerify`,
              {},
              {
                headers: {
                  Authorization: JSON.parse(result).accessToken,
                },
              }
            )
            .then((res) => {
              if (res.data === 'expired') {
                AsyncStorage.clear();
                navigation.replace('Auth');
              } else {
                navigation.replace('Main');
              }
            });
        } catch {
          Alert.alert('인터넷 연결을 확인해주세요');
        }
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ ...containerStyle }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/information.png')}
          style={{
            width: '30%',
            height: '50%',
            resizeMode: 'contain',
            marginTop: 130,
            marginBottom: 40,
          }}
        />
        <ActivityIndicator size='large' />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

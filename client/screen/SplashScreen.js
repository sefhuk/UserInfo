import { useEffect } from 'react';
import { SafeAreaView, View, Image, ActivityIndicator } from 'react-native';
import { containerStyle } from '../config/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then((result) => {
        navigation.replace(result === null ? 'Auth' : 'Main');
      });
    }, 3000);
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

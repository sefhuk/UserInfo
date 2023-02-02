import { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textStyle, containerStyle } from '../../config/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Location from 'expo-location';

const UserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0.9)).current;
  const fadeZ = useRef(new Animated.Value(1)).current;

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      navigation.replace('Auth');
    }
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    setLocation(coords);
  };

  const fadeAnimOut = () => {
    if (location.length !== 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  };

  const fadeZOut = () => {
    if (location.length !== 0) {
      console.log(location);
      Animated.timing(fadeZ, {
        toValue: -1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  };

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

  const handleClickLocation = () => {
    navigation.push('Location', {
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  useEffect(() => {
    getUserName();
    ask();
  }, []);

  useEffect(() => {
    fadeZOut();
    fadeAnimOut();
  }, [location]);

  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.image}
          />
          <Text
            style={{ ...textStyle, fontSize: wp('10%'), fontWeight: 'bold' }}
          >{`${name.name} 님`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginVertical: wp('10%'),
          }}
        >
          <TouchableOpacity
            style={styles.contentButton}
            onPress={handleClickLocation}
          >
            <Text style={[textStyle, styles.contentText]}>대중교통</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentButton}
            onPress={() => {
              navigation.navigate('Location', { locations: location });
            }}
          >
            <Text style={[textStyle, styles.contentText]}>위치</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButton}>
            <Text style={[textStyle, styles.contentText]}>. . .</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButton}>
            <Text style={[textStyle, styles.contentText]}>. . .</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text
              style={{
                ...textStyle,
                textAlign: 'center',
                fontSize: wp('7%'),
                fontWeight: 'bold',
              }}
            >
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          width: wp('100%'),
          height: hp('100%'),
          backgroundColor: 'black',
          opacity: fadeAnim,
          zIndex: fadeZ,
        }}
      >
        <Text
          style={{
            ...textStyle,
            textAlign: 'center',
            fontSize: wp('7%'),
            fontWeight: 'bold',
          }}
        >
          위치정보를 받아오고 있습니다
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('50%'),
    paddingVertical: '20%',
  },
  image: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: '3%',
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  contentButton: {
    justifyContent: 'center',
    width: wp('30%'),
    height: wp('30%'),
    borderWidth: 2,
    borderColor: 'white',
    margin: wp('5%'),
  },
  contentText: { fontSize: wp('5%'), fontWeight: 'bold', textAlign: 'center' },
  logoutButton: {
    justifyContent: 'center',
    width: wp('50%'),
    height: hp('7%'),
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default UserScreen;

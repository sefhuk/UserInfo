import { useState, useEffect, useRef } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { textStyle, containerStyle } from '../../config/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const UserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeZ = useRef(new Animated.Value(-1)).current;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const locations = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setLocation(locations[0].region);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeZ, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.9,
        duration: 700,
        useNativeDriver: false,
      }).start();
    });
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
    navigation.push('Location');
  };

  useEffect(() => {
    getUserName();
  }, []);

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
            <Text style={[textStyle, styles.contentText]}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButton} onPress={fadeIn}>
            <Text style={[textStyle, styles.contentText]}>. . .</Text>
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
          정보를 받아오고 있습니다
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

import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, Animated } from 'react-native';
import * as Location from 'expo-location';
import { containerStyle, textStyle } from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const UserScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const locations = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setLocation(locations[0].region);
    })();
  }, []);

  return (
    <SafeAreaView style={containerStyle}>
      <View>
        <Text style={textStyle}>{location}</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

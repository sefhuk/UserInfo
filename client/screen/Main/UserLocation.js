import { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { containerStyle, textStyle } from '../../config/globalStyles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getPreciseDistance } from 'geolib';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { GOOGLE_API_KEY, HTTP_HOST } from '@env';
import { imagePath } from '../../config/imagePath';

Location.setGoogleApiKey(GOOGLE_API_KEY);

const UserLocation = ({ route }) => {
  const [markers, setMarkers] = useState({});
  const [userPos, setUserPos] = useState({
    latitude: route.params.latitude, //37.20942786630357
    longitude: route.params.longitude, // 126.97946182203637
  });
  const [distance, setDistance] = useState([]);
  const [scrollViewVisible, setScrollViewVisible] = useState(true);

  const fadeScrollView = useRef(new Animated.Value(hp('-39%'))).current;

  const fadeScrollViewOut = () => {
    Animated.timing(fadeScrollView, {
      toValue: scrollViewVisible ? hp('1%') : hp('-39%'),
      duration: 350,
      useNativeDriver: false,
    }).start();
    scrollViewVisible
      ? setScrollViewVisible(false)
      : setScrollViewVisible(true);
  };

  const getRank = () => {
    let dis = [];
    Object.keys(markers).map((element) => {
      let obj = markers[element];
      let distanceObj = { name: element };
      distanceObj.distance = getPreciseDistance(userPos, {
        latitude: obj.latitude,
        longitude: obj.longitude,
      });
      distanceObj.image = imagePath[element];
      dis.push(distanceObj);
    });
    dis.sort((a, b) => a.distance - b.distance);
    setDistance(dis);
  };

  const getPosition = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        distanceInterval: 0.7,
      },
      (position) => {
        const newPos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserPos(newPos);
      }
    );
  };

  useEffect(() => {
    axios
      .get(`${HTTP_HOST}/location/list`, {
        headers: {
          Authorization: route.params.token,
        },
      })
      .then((res) => {
        let data = {};
        res.data.forEach((element) => {
          data[element.engName] = {
            newName: element.newName,
            oldName: element.oldName,
            latitude: +element.latitude,
            longitude: +element.longitude,
          };
        });
        setMarkers(data);
      });
    getPosition();
  }, []);

  useEffect(() => {
    getRank();
  }, [userPos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={containerStyle}>
        <View>
          <MapView
            style={{ width: '100%', height: hp('90%') }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userPos.latitude,
              longitude: userPos.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: 37.213439,
              longitude: 126.9769365,
            }}
            userInterfaceStyle='light'
          >
            <Marker
              title='내 위치'
              description={`${userPos.latitude}, ${userPos.longitude}`}
              coordinate={{
                latitude: userPos.latitude,
                longitude: userPos.longitude,
              }}
            >
              <MaterialCommunityIcons
                name='map-marker-account-outline'
                size={35}
                color='blue'
              />
            </Marker>
            {Object.keys(markers).map((element) => {
              let obj = markers[element];
              return (
                <Marker
                  key={element}
                  title={obj.newName}
                  description={`${obj.oldName}`}
                  coordinate={{
                    latitude: markers[element].latitude,
                    longitude: markers[element].longitude,
                  }}
                  pinColor={'orange'}
                  size={1}
                />
              );
            })}
          </MapView>
        </View>
        <Animated.View
          style={{
            width: '100%',
            height: hp('45%'),
            position: 'absolute',
            bottom: fadeScrollView,
            // backgroundColor: 'white',
          }}
        >
          <TouchableOpacity
            onPress={fadeScrollViewOut}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('6%'),
              backgroundColor: '#F4EDEC',
            }}
            activeOpacity={0.8}
          >
            <View
              style={{
                width: wp('20%'),
                height: hp('0.3%'),
                backgroundColor: 'gray',
                borderRadius: '50%',
              }}
            />
          </TouchableOpacity>
          <ScrollView bounces={'false'} style={{ backgroundColor: '#F4EDEC' }}>
            {distance.map((element) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    marginBottom: 1,
                  }}
                  key={element.name}
                >
                  <Image
                    style={{ width: wp('20%'), height: wp('20%') }}
                    source={element.image}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingLeft: wp('15%'),
                    }}
                  >{`${markers[element.name].newName}   :   ${
                    element.distance
                  }m..`}</Text>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default UserLocation;

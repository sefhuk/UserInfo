import { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
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

Location.setGoogleApiKey(GOOGLE_API_KEY);

const UserLocation = () => {
  const [mark, setMark] = useState({});
  const [pos, setPos] = useState({
    latitude: 37.2092017,
    longitude: 126.9769365,
  });
  const [distance, setDistance] = useState([]);

  const getRank = () => {
    let dis = [];
    Object.keys(mark).map((element) => {
      let obj = mark[element];
      let distanceObj = { name: element };
      distanceObj.distance = getPreciseDistance(pos, {
        latitude: obj.latitude,
        longitude: obj.longitude,
      });
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
        setPos(newPos);
      }
    );
  };

  useEffect(() => {
    axios.get(`${HTTP_HOST}/location/list`).then((res) => {
      let data = {};
      res.data.forEach((element) => {
        data[element.engName] = {
          newName: element.newName,
          oldName: element.oldName,
          latitude: +element.latitude,
          longitude: +element.longitude,
        };
      });
      setMark(data);
    });
    getPosition();
  }, []);

  useEffect(() => {
    getRank();
  }, [pos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={containerStyle}>
        <View>
          <MapView
            style={{ width: '100%', height: hp('100%') }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: pos.latitude,
              longitude: pos.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: 37.213439,
              longitude: 126.9769365,
            }}
            userInterfaceStyle='light'
            onMarkerPress={(event) => {
              console.log(event.nativeEvent);
            }}
            onMarkerSelect={(event) => {
              console.log(event.nativeEvent);
            }}
          >
            <Marker
              title='내 위치'
              description={`${pos.latitude}, ${pos.longitude}`}
              coordinate={{
                latitude: pos.latitude,
                longitude: pos.longitude,
              }}
            >
              <MaterialCommunityIcons
                name='map-marker-account-outline'
                size={35}
                color='blue'
              />
            </Marker>
            {Object.keys(mark).map((element) => {
              let obj = mark[element];
              return (
                <Marker
                  key={element}
                  title={obj.newName}
                  description={`${obj.oldName}`}
                  coordinate={{
                    latitude: mark[element].latitude,
                    longitude: mark[element].longitude,
                  }}
                  pinColor={'orange'}
                  size={1}
                />
              );
            })}
          </MapView>
        </View>
        <ScrollView
          style={{
            width: '100%',
            height: '40%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'black',
            opacity: 0.5,
          }}
        >
          {distance.map((element) => (
            <Text
              style={{
                ...textStyle,
                fontWeight: 'bold',
                paddingLeft: wp('15%'),
              }}
              key={element.name}
            >{`${mark[element.name].newName}   :   ${
              element.distance
            }m..`}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default UserLocation;

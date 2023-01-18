import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { containerStyle, textStyle } from '../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        width: wp('100%'),
        height: hp('70%'),
        backgroundColor: 'black',
        opacity: 0.9,
        zIndex: 0,
      }}
    >
      <Text
        style={{
          ...textStyle,
          textAlign: 'center',
          fontSize: '30%',
          fontWeight: 'bold',
        }}
      >
        정보를 받아오고 있습니다
      </Text>
    </View>
  );
};

export default Loading;

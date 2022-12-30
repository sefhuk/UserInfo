import { SafeAreaView, Text, View } from 'react-native';
import { textStyle, containerStyle } from '../config/globalStyles';

const User = ({ route }) => {
  return (
    <SafeAreaView style={containerStyle}>
      <View>
        <Text style={textStyle}>{`${route.params.name}님 안녕하세요`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default User;

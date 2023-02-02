import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyle, textStyle } from '../../config/globalStyles';

const FindAccountScreen = () => {
  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.button}>
          <Text style={textStyle}>아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={textStyle}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {},
  button: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
});

export default FindAccountScreen;

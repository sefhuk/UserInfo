import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { textStyle } from '../config/globalStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
          <Text style={{ ...styles.title, ...textStyle }}>USER INFO</Text>
        </View>
        <View
          style={{
            flex: 0.6,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push('Login');
            }}
          >
            <Text style={{ ...styles.buttonText, ...textStyle }}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push('Register');
            }}
          >
            <Text style={{ ...styles.buttonText, ...textStyle }}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrap: {
    flex: 0.5,
    marginTop: '40%',
  },
  title: {
    fontSize: '70%',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    width: '40%',
    height: '50%',
  },
  buttonText: { fontSize: '35%', textAlign: 'center' },
});

export default HomeScreen;

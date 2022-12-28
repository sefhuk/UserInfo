import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { containerStyle, textStyle } from '../config/globalStyles';

const LoginScreen = () => {
  return (
    <SafeAreaView style={containerStyle}>
      <KeyboardAvoidingView
        style={styles.wrap}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.title}>
          <Text
            style={{
              ...textStyle,
              fontSize: '50%',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            LET'S LOGIN
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder='아이디'
            placeholderTextColor='white'
          />
          <TextInput
            style={styles.textInput}
            placeholder='비밀번호'
            placeholderTextColor='white'
            secureTextEntry='true'
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ ...textStyle, fontSize: '30%' }}>로그인</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  title: { justifyContent: 'flex-end', height: '15%', marginTop: '20%' },
  input: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '30%',
  },
  textInput: {
    width: '80%',
    height: '30%',
    paddingLeft: 10,
    fontSize: '20%',
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '80%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
});

export default LoginScreen;


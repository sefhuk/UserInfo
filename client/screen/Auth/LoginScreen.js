import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { containerStyle, textStyle } from '../../config/globalStyles';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const save = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('good save');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeIdInput = (text) => {
    setId(text);
  };

  const handleChangePasswordInput = (text) => {
    setPassword(text);
  };

  const handleClickLogin = () => {
    axios
      .get(`http://hyuk.ml:19001/account/login`, {
        params: {
          id: id,
          password: password,
        },
      })
      .then((res) => {
        if (!res.data[0]) {
          Alert.alert('회원정보가 일치하지 않습니다');
        } else {
          save(res.data[0]);
          navigation.replace('Main');
          Alert.alert(`${res.data[0].name}님 환영합니다`);
        }
      });
  };

  const handleClickRegister = () => {
    navigation.push('Register');
  };

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
            USER INFO
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder='아이디'
            placeholderTextColor='white'
            onChangeText={handleChangeIdInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder='비밀번호'
            placeholderTextColor='white'
            onChangeText={handleChangePasswordInput}
            secureTextEntry='true'
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity style={styles.button} onPress={handleClickLogin}>
            <Text style={{ ...textStyle, fontSize: '30%' }}>로그인</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: '30%', width: '100%' }}
        onPress={handleClickRegister}
      >
        <Text style={{ ...textStyle, textAlign: 'center', color: 'gray' }}>
          아직 계정이 없다구요? 가입을 해주세요!
        </Text>
      </TouchableOpacity>
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

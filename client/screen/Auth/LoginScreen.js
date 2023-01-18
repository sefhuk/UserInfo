import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { containerStyle, textStyle } from '../../config/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { HTTP_HOST } from '@env';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [parentHeight, setParentHeight] = useState(0);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setParentHeight(height);
  };

  const save = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
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
      .get(`${HTTP_HOST}/account/login`, {
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
      })
      .catch(() => {
        Alert.alert('서버나 키세요 ㅡㅡ');
      });
  };

  const handleClickRegister = () => {
    navigation.push('Register');
  };

  return (
    <SafeAreaView style={containerStyle}>
      <KeyboardAwareScrollView
        style={styles.wrap}
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{ height: hp('80%') }}
      >
        <View style={styles.title}>
          <Text
            style={{
              ...textStyle,
              fontSize: wp('13'),
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
            placeholderTextColor='#ffffff'
            onChangeText={handleChangeIdInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder='비밀번호'
            placeholderTextColor='#ffffff'
            onChangeText={handleChangePasswordInput}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity style={styles.button} onPress={handleClickLogin}>
            <Text style={{ ...textStyle, fontSize: wp('7%') }}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ marginTop: hp('5%') }}
            onPress={handleClickRegister}
          >
            <Text style={{ ...textStyle, textAlign: 'center', color: 'gray' }}>
              아직 계정이 없다구요? 가입을 해주세요!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  title: {
    justifyContent: 'flex-end',
    height: hp('12%'),
    marginTop: hp('15%'),
  },
  input: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp('28'),
  },
  textInput: {
    width: wp('80%'),
    height: hp('8%'),
    fontSize: wp('6%'),
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('8%'),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '80%',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 10,
  },
});

export default LoginScreen;

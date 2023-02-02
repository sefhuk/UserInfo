import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyle, textStyle } from '../../config/globalStyles';
import axios from 'axios';
import { HTTP_HOST } from '@env';

const RegisterScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pn, setPn] = useState({ value: '', completed: false });
  const [isIdDuplication, setIsIdDuplication] = useState(true);

  const handleChangeIdInput = (text) => {
    setId(text);
  };

  const handleChangeId = (event) => {
    setIsIdDuplication(true);
  };
  const handleChangePwInput = (text) => {
    setPw(text);
  };

  const handleChangeEmailInput = (text) => {
    setEmail(text);
  };

  const handleChangeNameInput = (text) => {
    setName(text);
  };

  const handleChangePnInput = (text) => {
    if (!isNaN(Number(text[text.length - 1])) || text.length === 0) {
      let number = text;

      if (number.length < 13) {
        number = number.replace(/-/g, '');
      }

      if (number.length === 11) {
        number = `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(
          7,
          11
        )}`;
      }

      if (number.length === 13) {
        setPn({ value: number, completed: true });
      } else {
        setPn({ value: number, completed: false });
      }
    } else {
      Alert.alert('숫자만 입력 가능합니다');
    }
  };

  const checkDuplication = () => {
    if (!id) {
      Alert.alert('아이디를 입력하세요');
    } else {
      axios
        .get(`${HTTP_HOST}/account/register/checkId`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          if (res.data === true) {
            Alert.alert('사용 불가능한 아이디입니다');
            setIsIdDuplication(true);
          } else {
            Alert.alert('사용 가능한 아이디입니다');
            setIsIdDuplication(false);
          }
        });
    }
  };

  const handleClickRegister = () => {
    if (id && pw && email && name && pn.completed) {
      if (!isIdDuplication) {
        // Alert.alert('모든 정보가 입력되었습니다');
        axios
          .post(`${HTTP_HOST}/account/register`, {
            id: id,
            password: pw,
            name: name,
            phone_number: pn.value,
            email: email,
          })
          .then((res) => {
            Alert.alert('가입 성공');
            navigation.pop();
          });
      } else {
        Alert.alert('아이디 중복확인을 해주세요');
      }
    } else {
      Alert.alert('입력 정보를 확인해주세요');
    }
  };

  return (
    <SafeAreaView style={{ ...containerStyle, paddingHorizontal: wp('3%') }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{ height: hp('90%') }}
      >
        <View style={{ marginVertical: hp('3%'), position: 'relative' }}>
          <Text style={{ ...textStyle, ...styles.text }}>로그인 정보</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              justifyContent: 'center',
              right: 0,
              width: '20%',
              height: '15%',
              borderWidth: 2,
              borderColor: 'white',
            }}
            onPress={checkDuplication}
          >
            <Text
              style={{
                ...textStyle,
                textAlign: 'center',
                fontWeight: ' bold',
              }}
            >
              중복확인
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder='아이디'
            placeholderTextColor='gray'
            onChange={handleChangeId}
            onChangeText={handleChangeIdInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder='비밀번호'
            placeholderTextColor='gray'
            secureTextEntry={true}
            onChangeText={handleChangePwInput}
          />
          <TextInput
            style={styles.textInput}
            placeholder='example@test.com'
            placeholderTextColor='gray'
            onChangeText={handleChangeEmailInput}
          />
        </View>
        <View style={{ marginBottom: hp('3%') }}>
          <Text style={{ ...textStyle, ...styles.text }}>이름</Text>
          <TextInput
            style={styles.textInput}
            placeholder='이름'
            placeholderTextColor='gray'
            onChangeText={handleChangeNameInput}
          />
        </View>
        <View style={{ marginBottom: hp('3%') }}>
          <Text style={{ ...textStyle, ...styles.text }}>전화번호</Text>
          <TextInput
            style={styles.textInput}
            placeholder={`'-' 없이 입력`}
            placeholderTextColor='gray'
            onChangeText={handleChangePnInput}
            maxLength={13}
            value={pn.value}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                ...textStyle,
                fontSize: wp('8%'),
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              onPress={handleClickRegister}
            >
              가입하기
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: wp('8%'), fontWeight: 'bold', marginBottom: hp('1%') },
  textInput: {
    borderWidth: 2,
    borderColor: '#ffffff',
    height: hp('6%'),
    marginBottom: hp('2%'),
    paddingLeft: '3%',
    fontSize: wp('5%'),
    color: '#ffffff',
  },
  button: {
    height: hp('7%'),
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
  },
});

export default RegisterScreen;

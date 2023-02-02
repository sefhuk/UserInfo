// import { useState } from 'react';
// import { View, Text, Animated } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { containerStyle, textStyle } from '../../config/globalStyles';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import axios from 'axios';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

// const UserTraffic = () => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [dataset, setDataset] = useState([]);

//   const requestDataset = (text) => {
//     axios({
//       url: 'http://ws.bus.go.kr/api/rest/pathinfo/getLocationInfo?serviceKey=JMFA3NmIHrN0gwmqihdvwJsfZhUV0m%2FOw2onU047ApOEEbh8ZgoVAndU7UizFZWiBiAwANrpv9CXww%2BlNX8hQQ%3D%3D&&resultType=json',
//       params: {
//         stSrch: text,
//       },
//     }).then((res) => {
//       setDataset(
//         res.data.msgBody.itemList.map((element) => {
//           return { title: element.poiNm };
//         })
//       );
//     });
//   };
//   const change = (text) => {
//     if (text.length > 1) requestDataset(text);
//   };
//   return (
//     <SafeAreaView style={containerStyle}>
//       <View>
//         <AutocompleteDropdown
//           clearOnFocus={false}
//           closeOnBlur={false}
//           closeOnSubmit={false}
//           onSelectItem={setSelectedItem}
//           dataSet={dataset}
//           onChangeText={change}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default UserTraffic;

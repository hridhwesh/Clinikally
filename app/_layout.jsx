import { StyleSheet, Text, View, Image } from 'react-native';
import "../global.css"; 
import {Slot,Stack} from 'expo-router';

//Root or Main layout of the program. There are two screens as mentioned below..
//One is the entry page, called the index.jsx which takes in the inputs of product name and pincode and works accordingly
//If the entered product is in stock, preferable output is displayed on the profile.jsx screen.

const RootLayout = () => {
  return (
    
    <Stack>
    <Stack.Screen name="index" 
    options={{header: (props) =>
      (
        <View style={{ height: 110 , justifyContent: 'flex-end', alignItems: 'center' , paddingBottom: 5}}>
         <Image
        style={{ width: 100, height: 50  }}
        source={require("../assets/Clin.png")}
      />
        </View>
      ),headerShown:true ,  }} />
      <Stack.Screen name="profile" 
      options={{header: (props) =>
        (
          <View style={{ height: 110 , justifyContent: 'flex-end', alignItems: 'center' , paddingBottom: 5}}>
           <Image
          style={{ width: 100, height: 50  }}
          source={require("../assets/Clin.png")}
        />
          </View>
        ),headerShown:true ,  }} 
      />
    </Stack>
  )
}

export default RootLayout 


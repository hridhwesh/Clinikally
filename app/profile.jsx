import {
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import moment from 'moment';
moment().format();

//necessary style sheet values
const styles = StyleSheet.create({
    logo: {
        width: 20,
        height: 20,
        marginTop: 8,
    },
    logo1: {
        width: 20,
        height: 25,
        marginTop: 13,
        marginLeft: 50,
    },
    logo2: {
        width: 50,
        height: 25,
        marginTop: 13,
        marginLeft: 30,
    },
    logo3: {
        width: 30,
        height: 30,
        marginTop: 8,
        marginLeft: 45,
    },
    productImage: {
        marginTop: 20,
        height: 300,
        widht: 300,
    },
    offer: {
        width:80,
        height:80,
        shadowColor:"white",
        shadowOpacity:20,

    },
    addtocart:{
        width:40,
        height:40,

    },
});
//this function handles the countdown according to the user's time 
const CountdownTimer = ({provider}) => {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = moment();
            if (provider==="Provider A"){
                var targetTime = moment().hour(17).minute(0).second(0); 
                if (now.isAfter(targetTime)) {
                    setTimeRemaining('Get it delivered tomorrow!');
                    return;
                }
            }
            if (provider==="Provider B"){
                var targetTime = moment().hour(9).minute(0).second(0);
                if (now.isAfter(targetTime)) {
                    setTimeRemaining('Get it delivered tomorrow!');
                    return;
                }
            }
            if (provider==="General Partners"){
                setTimeRemaining('Delivery within 2-5 days');
                return;
            }
            

            // Calculate time remaining if before 5 PM
            const duration = moment.duration(targetTime.diff(now));
            const hours = String(duration.hours()).padStart(2, '0');
            const minutes = String(duration.minutes()).padStart(2, '0');
            const seconds = String(duration.seconds()).padStart(2, '0');

            setTimeRemaining(`${hours} hrs ${minutes} mins ${seconds} secs`);
        };

        // Start countdown update
        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId); // Clear on unmount
    }, []);

    return (
        <View className="mt-[10px]">
            {timeRemaining === 'Get it delivered tomorrow!' || timeRemaining ==="Delivery within 2-5 days" ? (
                <View className="flex-row">
                <Image
                style={{ width: 30, height: 30  }}
                 source={require("../assets/download.png")}
                />
                <Text className="text-[#D32F2F] font-semibold text-lg ml-[10px]">{timeRemaining}</Text>
                </View>
            ) : (
                <View className="flex-row">
                    <Image
                    style={{ width: 30, height: 30  }}
                    source={require("../assets/download.png")}
                    />
                <Text className="text-[#00796B] font-semibold text-lg ml-[10px]">
                    Order within {timeRemaining}{'\n'} to get same-day delivery!
                </Text>
                </View>
            )}
        </View>
    );
};
const Profile = () => {
    const params = useLocalSearchParams();

    console.log("Route Parameters:", params); // v

    // Destructure the params you passed
    const { productId, productPrice, pincode , Name,provider,TAT} = params;

    
    var productID = productId;
    var price = productPrice;
    var productName = Name;
    var Provider = provider;
    var tat = TAT;
    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-[#f0f5f5]">
                <ScrollView
                    className="mx-[20px] mt-[15px]"
                    showsVerticalScrollIndicator={false}
                >
                    <Text className="color-gray-500 mb-[10px]">Home / {productID} </Text>
                    <Text className="text-3xl font-semibold mb-[10px]">
                        {productName}
                    </Text>
                    <View className="flex-row gap-8">
                        <View className="flex-row">
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/240px-Eo_circle_green_checkmark.svg.png",
                                }}
                            />
                            <Text className="ml-[5px] color-green-700">
                                Lightens{"\n"}Spots
                            </Text>
                        </View>
                        <View className="flex-row">
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/240px-Eo_circle_green_checkmark.svg.png",
                                }}
                            />
                            <Text className="ml-[5px] color-green-700">
                                Targets{"\n"}Pigmentation
                            </Text>
                        </View>
                        <View className="flex-row">
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/240px-Eo_circle_green_checkmark.svg.png",
                                }}
                            />
                            <Text className="ml-[5px] color-green-700">
                                Evens Skin{"\n"}Tone
                            </Text>
                        </View>
                    </View>
                    <Image
                        style={styles.productImage}
                        source={{
                            uri: "https://www.clinikally.com/cdn/shop/products/SesdermaRU_single.jpg?v=1682674395&width=7000",
                        }}
                        alt="Hello"
                    />
                    <View className="mt-[20px] h-[70px] flex-row border-2 rounded-xl border-[#CFB5F6] ">
                        <View className="flex-col border-r-2 border-[#CFB5F6] ">
                            <Image
                                style={styles.logo1}
                                source={{
                                    uri: "https://www.clinikally.com/cdn/shop/files/shield.png?v=1711537188&width=300",
                                }}
                            />
                            <Text className="px-4 mt-[2px]">101% Original</Text>
                        </View>
                        <View className="flex-col border-r-2 border-[#CFB5F6] ">
                            <Image
                                style={styles.logo2}
                                source={{
                                    uri: "https://www.clinikally.com/cdn/shop/files/Lowest_price_Icon_fddb029e-c955-49c5-9edc-4dd5cffdf0c0.png?v=1712757993&width=300",
                                }}
                            />
                            <Text className="px-4 mt-[2px]">Lowest Price</Text>
                        </View>
                        <View className="flex-col ">
                            <Image
                                style={styles.logo3}
                                source={{
                                    uri: "https://www.clinikally.com/cdn/shop/files/FreeShipping_icon_51f0da0c-8848-48c3-acf6-2ae61cd93177.png?v=1712757905&width=300",
                                }}
                            />
                            <Text className="px-4 mt-[2px]">Free Shipping</Text>
                        </View>
                    </View>
                    <View className="flex-row mt-[15px]">
                        <Text className="font-light text-[15px] mt-[5px]">
                            MRP :{" "}
                        </Text>
                        <Text className="text-green-700 font-extrabold text-[20px]">
                            {" "}
                            ₹{price}
                        </Text>
                    </View>
                    <Text className="font-light text-[10px]">
                        (incl. of all taxes.)
                    </Text>
                    <View className="flex-row mt-[0px]">
                        <Text className="text-[12px] mt-[18px] mr-[10px]">
                            Size:{" "}
                        </Text>
                        <View className="border-2 mt-[10px] border-[#7D32EB] rounded-[7px] w-[60px] h-[30px] bg-[#EBE1FA]">
                            <Text className="ml-[5px] mt-[5px]"> 30 ml </Text>
                        </View>
                    </View>
                    <View className="flex-row bg-white w-[60px] mt-[20px] h-[30px]  rounded-[7px] ">
                        <Text className="font-semibold ml-[10px] mt-[7px]">
                            Qty:
                        </Text>
                        <Text className="text-[#9E9E9E] font-semibold mt-[7px] ml-[3px] ">
                            1
                        </Text>
                    </View>
                    <View className="bg-[#FFE082] mt-[10px] px-[15px] py-[10px] rounded-[10px]">
                        <Text className="text-[#757575] font-semibold mb-[0px]">
                            Available offers
                        </Text>
                        <View className="flex-row">
                        <Image
                        style={styles.offer}
                        source={{
                            uri:"https://www.clinikally.com/cdn/shop/files/free_delivery_icon_40ecd415-f712-42ff-9d53-908cd2cbbfb5.png?v=1691065129&width=60",

                        }}
                        />
                        <Text className="text-[25px] mt-[15px] text-[#757575] ml-[15px] ">OFFER INFO{'\n'} HERE</Text>
                        </View>

                    </View>
                    {/* Add the code here */}
                    <View className="bg-[#] mt-[10px] px-[15px] pt-[4px] rounded-[10px]">
                    <Text className="text-[#00796B]  font-bold mb-[0px] text-[15px] ">
                        Delivery information {'\n'}
                    </Text>
                    <Text className="text-[14px] text-[#757575] font-semibold ">
                        For pincode: {pincode}
                    </Text>
                    <CountdownTimer provider={Provider} />
                    </View>
            <View style={styles1.buttonContainer}>
            {/* Add to Cart Button */}
            <TouchableOpacity style={styles1.addToCartButton}
            onPress={() => {
            Alert.alert("Redirected to cart page..."); // Non-functional
            }}
            >
                <Image
                    source={{ uri: 'https://w7.pngwing.com/pngs/895/196/png-transparent-purple-shopping-cart-icon.png' }}
                    style={styles1.icon}
                />
                <Text style={styles1.addToCartText}>Add to cart</Text>
            </TouchableOpacity>

            {/* Buy It Now Button */}
            <TouchableOpacity 
            style={styles1.buyItNowButton}
            onPress={() => {
            Alert.alert("Redirected to item buying page..."); // Non-functional
            }}
            >
            <Image
            source={{ uri: 'https://static-00.iconduck.com/assets.00/lightning-bolt-icon-1512x2048-uqtpfmg8.png' }}
            style={styles1.icon}
            />
            <Text style={styles1.buyItNowText}>Buy it now</Text>
            </TouchableOpacity>
        </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
//stylesheet for the buttons below (nonfunctional)
const styles1 = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginTop:15,
        alignItems: 'center',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9C27B0', // Purple border color
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        height:50,
        width:170,
    },
    buyItNowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9C27B0', // Purple background color
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height:50,
        width:170,
        marginLeft:10,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    addToCartText: {
        color: '#9C27B0', // Purple text color for Add to Cart
        fontWeight: 'bold',
        fontSize:16,
    },
    buyItNowText: {
        color: 'white', // White text color for Buy it Now
        fontWeight: 'bold',
        fontSize:16,
    },
});
export default Profile;

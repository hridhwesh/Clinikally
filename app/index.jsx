import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import productData from "../assets/Products.json";
import pincodeDataJSON from "../assets/Pincodes.json";
import stockDataJson from "../assets/Stock.json";
import { useRouter } from "expo-router"; //for handling routing

export default function Index({}) {
    const navigation = useNavigation();
    const router = useRouter(); // Use router instead of navigation
    const [value, setValue] = useState(null);
    const [price, setPrice] = useState(0);
    const [prodata, setData] = useState([]);
    const [pin, setPin] = useState(null); // Pincode selection
    const [pincodeData, setPincodeData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [proName,setproName]= useState(null);
    const [TAT, setTAT] = useState(null);
    const [provider, setProvider] = useState(null);

    const dropdownData = prodata.map((item) => ({
        label: `${item["Product Name"]}`,
        value: item["Product ID"],
        price: item["Price"],
    }));

    const dropdownData1 = pincodeData.map((item) => ({
        label: `${item["Pincode"]}`,
        value: item["Pincode"],
        provider: item["Logistics Provider"],
        TAT: item["TAT"],
    }));

    useEffect(() => {
        setData(productData); // Loading product data correctly
        setPincodeData(pincodeDataJSON); // Loading pincode data correctly
        setStockData(stockDataJson); // Loading stock info data correctly
    }, []);
    //below is the main UI code
    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-[#f0f5f5]">
                <View className=" mt-[70px] font-manrope mx-[30px] mt-[30px]">
                    <Text className="text-3xl ">Search Product :</Text>
                    <Dropdown
                        style={styles1.dropdown}
                        placeholderStyle={styles1.placeholderStyle}
                        selectedTextStyle={styles1.selectedTextStyle}
                        inputSearchStyle={styles1.inputSearchStyle}
                        data={dropdownData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={(item) => {
                            setValue(item.value);
                            setPrice(item.price);
                            setproName(item.label);
                        }}
                    />
                    <Text className="text-3xl mb-[20px]">
                        Price: <Text className="color-green-700">₹{price}</Text>{" "}
                    </Text>

                    <Text className="text-3xl ">Enter Pincode :</Text>
                    <Dropdown
                        style={styles1.dropdown}
                        placeholderStyle={styles1.placeholderStyle}
                        selectedTextStyle={styles1.selectedTextStyle}
                        inputSearchStyle={styles1.inputSearchStyle}
                        data={dropdownData1}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Pin Code"
                        searchPlaceholder="Search..."
                        value={pin}
                        onChange={(item) => {
                            setPin(item.value);
                            setProvider(item.provider);
                            setTAT(item.TAT);
                            
                        }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            const productStock = stockData.find(
                                (item) => item["Product ID"] === value
                            );
                            const isInStock = productStock
                                ? productStock[
                                      "Stock Available"
                                  ].toLowerCase() === "true"
                                : false;

                            if (isInStock) {
                                router.push({
                                    pathname: "/profile",
                                    params: {
                                        productId: value,
                                        productPrice: price,
                                        pincode: pin,
                                        Name:proName,
                                        provider:provider,
                                        TAT:TAT,
                                    },
                                });
                            } else {
                                Alert.alert("Out of Stock");
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Check Product</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
//necessary stylesheet here
const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        height: 65,
        backgroundColor: "#7D32EB", // Custom background color
        padding: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff", // Text color for better visibility
        fontSize: 24,
    },
});

const styles1 = StyleSheet.create({
    dropdown: {
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

{
    /* <StatusBar style="auto" /> */
}

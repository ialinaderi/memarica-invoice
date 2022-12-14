import { Text, View } from "@react-pdf/renderer";
import RTLText from "./components/rtl_text";

// Create Document Component
const Main = ({ products }) => {
    let totalPrice = 0;
    products.forEach((element) => {
        totalPrice += element.price * element.quantity;
    });
    totalPrice = totalPrice.toLocaleString("en-US");

    const productLentgh = products.length;
    for (let index = 0; index < 7 - productLentgh; index++) {
        products.push({
            productName: "",
            brand: "",
            unit: "",
            quantity: "",
            price: "",
        });
    }

    const list = products.map((element, index) => {
        const row = index + 1;
        const productName = element.productName;
        const brand = element.brand;
        const unit = element.unit;
        let quantity = parseFloat(element.quantity).toLocaleString("en-US");
        let price = parseFloat(element.price).toLocaleString("en-US");
        let total = (
            parseFloat(element.price) * parseFloat(element.quantity)
        ).toLocaleString("en-US");

        return (
            <View
                style={{
                    marginLeft: 10,
                    borderBottom: 0.5,
                    borderColor: "#a1a1a1",
                    flexDirection: "row-reverse",
                    fontSize: 11,
                    fontWeight: 400,
                }}
            >
                <View
                    style={{
                        height: 40,
                        width: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        // backgroundColor: "yellow",
                    }}
                >
                    <Text>{row}</Text>
                </View>
                <View
                    style={{
                        height: 40,
                        width: 130,
                        paddingHorizontal: 10,
                        justifyContent: "center",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>{productName ? productName : "??????"}</RTLText>
                </View>
                <View
                    style={{
                        height: 40,
                        width: 60,
                        paddingHorizontal: 10,
                        justifyContent: "center",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>{brand ? brand : "???"}</RTLText>
                </View>
                <View
                    style={{
                        height: 40,
                        width: 80,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        // backgroundColor: "blue",
                    }}
                >
                    <Text>{price !== "NaN" ? price : "???"}</Text>
                </View>
                <View
                    style={{
                        height: 40,
                        width: 80,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>{quantity !== "NaN" ? quantity : "???"}</RTLText>
                    <View
                        style={{
                            flexDirection: "row",
                            fontSize: 6,
                            fontWeight: 400,
                        }}
                    >
                        <Text>{unit}</Text>
                    </View>
                </View>
                <View
                    style={{
                        height: 40,
                        width: 80,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        // backgroundColor: "blue",
                    }}
                >
                    <Text>{total !== "NaN" ? total : "???"}</Text>
                </View>
            </View>
        );
    });

    return (
        <View
            style={{
                color: "black",
                flex: 1,
                marginTop: 80,
                marginRight: -60,
            }}
        >
            {/*ROW*/}
            <View
                style={{
                    marginLeft: 10,
                    // borderBottom: 0.5,
                    borderColor: "#a1a1a1",
                    flexDirection: "row-reverse",
                    fontSize: 11,
                    fontWeight: 700,
                }}
            >
                <View
                    style={{
                        width: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor: "yellow",
                    }}
                >
                    <RTLText>????????</RTLText>
                </View>
                <View
                    style={{
                        width: 130,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        justifyContent: "center",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>?????? ????????</RTLText>
                </View>
                <View
                    style={{
                        width: 60,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        justifyContent: "center",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>????????</RTLText>
                </View>
                <View
                    style={{
                        width: 80,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>????????</RTLText>
                    <View
                        style={{
                            flexDirection: "row",
                            fontSize: 6,
                            fontWeight: 400,
                        }}
                    >
                        <Text>(</Text>
                        <Text>??????????</Text>
                        <Text>)</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: 70,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>??????????</RTLText>
                </View>
                <View
                    style={{
                        width: 80,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        // backgroundColor: "blue",
                    }}
                >
                    <RTLText>??????????</RTLText>
                    <View
                        style={{
                            flexDirection: "row",
                            fontSize: 6,
                            fontWeight: 400,
                        }}
                    >
                        <Text>(</Text>
                        <Text>??????????</Text>
                        <Text>)</Text>
                    </View>
                </View>
            </View>
            {/*ROW*/}
            {/*-------------------------------------------ROW---------------------------------------*/}
            {list}
            <View
                style={{
                    color: "white",
                    marginTop: 50,
                    fontWeight: 700,
                    marginRight: "30vw",
                    fontSize: 14,
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    backgroundColor: "#6D7C69",
                    paddingHorizontal: 30,
                    paddingVertical: 18,
                    borderBottomRightRadius: 99,
                    borderTopRightRadius: 99,
                }}
            >
                <View style={{ flexDirection: "row-reverse" }}>
                    <Text>?????????? ????</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            fontSize: 8,
                            fontWeight: 400,
                            alignItems: "center",
                            marginTop: 5,
                            marginRight: 3,
                        }}
                    >
                        <Text>(</Text>
                        <Text>??????????</Text>
                        <Text>)</Text>
                    </View>
                </View>
                <View>
                    <Text>{totalPrice}</Text>
                </View>
            </View>
            <View
                style={{
                    marginRight: "30vw",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        display: "flex",
                        textAlign: "right",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#6D7C69",
                        fontSize: 12,
                        marginTop: 8,
                    }}
                >
                    ???? ?????????? ???????????????? ???? ???????????? ?????????? ??????????????!
                </Text>
            </View>
        </View>
    );
};

export default Main;

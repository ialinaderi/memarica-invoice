import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from "@react-pdf/renderer";
import RTLText from "./components/rtl_text";

// Create Document Component
function Sidebar({ name, gender }) {
    if (gender === "آقا") {
        gender = "آقای";
    } else if (gender === "خانم") {
        gender = "خانم";
    } else {
        gender = "";
    }

    return (
        <View
            style={{
                width: "28vw",
                backgroundColor: "#E1E7DF",
                color: "#6D7C69",
                textAlign: "right",
                zIndex: 1,
            }}
        >
            <Text
                style={{
                    fontSize: 450,
                    fontWeight: 200,
                    opacity: 0.1,
                    marginTop: -50,
                    marginBottom: -200,
                }}
            >
                }
            </Text>
            <View
                style={{
                    margin: 10,
                    justifyContent: "flex-end",
                    flex: 1,
                    paddingVertical: 4,
                }}
            >
                <View
                    style={{
                        borderBottom: 1,
                        borderColor: "#6D7C69",
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontWeight: 700 }}>صورتحساب برای:</Text>
                    <RTLText style={{ fontSize: 16, marginBottom: 10 }}>{`${gender} ${name}`}</RTLText>
                </View>
                <View
                    style={{
                        fontSize: 8,
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        paddingHorizontal: 2,
                    }}
                >
                    <RTLText style={{ marginBottom: 5 }}>
                        در صورت سفارش محصول بین 1 الی 7 روز تحویل مشتری خواهد
                        شد.
                    </RTLText>
                    <RTLText style={{ marginBottom: 5 }}>
                        هزینه حمل و نقل به عهده مشتری می‌باشد.
                    </RTLText>
                    <RTLText style={{ marginBottom: 5 }}>
                        اعتبار پیش‌فاکتور تا 24 ساعت می‌باشد.
                    </RTLText>
                    <RTLText style={{ marginBottom: 5 }}>
                        قیمت های ارائه شده بدون احتساب کسورات قانونی می‌باشد.
                    </RTLText>
                </View>
            </View>
        </View>
    );
}

export default Sidebar;

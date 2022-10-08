import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from "@react-pdf/renderer";

// Create Document Component
const Header = ({invoiceNumber, date}) => (
    <View
        style={{
            fontFamily: "Dana",
            direction: "rtl",
            flexDirection: "row",
        }}
    >
        <View
            style={{
                flex: 1,
                alignItems: "center",
                alignSelf: "center",
            }}
        >
            <Image
                src={"assets/assebled-logo.png"}
                style={{ height: 120, width: 120, marginRight: 10 }}
            />
        </View>
        <View
            style={{
                color: "white",
                backgroundColor: "#6D7C69",
                borderBottomLeftRadius: 100,
                paddingHorizontal: 80,
                paddingVertical: 25,
                paddingBottom: 35,
                paddingRight: 75,
            }}
        >
            <Text style={{ fontWeight: 800, fontSize: 36 }}>صورتحساب</Text>
            <View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: 10,
                    }}
                >
                    <View>
                        <Text>{invoiceNumber}</Text>
                    </View>
                    <View>
                        <Text>شماره صورتحساب</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: 10,
                    }}
                >
                    <View>
                        <Text>{date.replaceAll('/', ' / ')}</Text>
                    </View>
                    <View>
                        <Text>تاریخ</Text>
                    </View>
                </View>
                <View></View>
            </View>
        </View>
    </View>
);

export default Header;

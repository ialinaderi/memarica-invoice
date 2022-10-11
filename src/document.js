import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from "@react-pdf/renderer";
import Header from "./templates/modern/header";
import { PDFViewer } from "@react-pdf/renderer";
import Sidebar from "./templates/modern/sidebar";
import Main from "./templates/modern/main";
import Footer from "./templates/modern/footer";
import Form from "./components/form";
import { uuid } from "uuidv4";

Font.register({
    family: "Dana",
    fonts: [
        { src: "fonts/dana-fanum/Dana-FaNum-Thin.ttf", fontWeight: 100 },
        { src: "fonts/dana-fanum/Dana-FaNum-ExtraLight.ttf", fontWeight: 200 },
        { src: "fonts/dana-fanum/Dana-FaNum-Light.ttf", fontWeight: 300 },
        { src: "fonts/dana-fanum/Dana-FaNum-Regular.ttf", fontWeight: 400 },
        { src: "fonts/dana-fanum/Dana-FaNum-Medium.ttf", fontWeight: 500 },
        { src: "fonts/dana-fanum/Dana-FaNum-DemiBold.ttf", fontWeight: 600 },
        { src: "fonts/dana-fanum/Dana-FaNum-Bold.ttf", fontWeight: 700 },
        { src: "fonts/dana-fanum/Dana-FaNum-UltraBold.ttf", fontWeight: 800 },
        { src: "fonts/dana-fanum/Dana-FaNum-Black.ttf", fontWeight: 900 },
    ],
});

export const styles = StyleSheet.create({
    title: {
        fontFamily: "Dana",
        fontWeight: 800,
        fontSize: 30,
        color: "#ffffff",
    },
    titleBox: {
        color: "white",
        backgroundColor: "#6D7C69",
        borderBottomLeftRadius: "30px",
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    body: {
        fontFamily: "Dana",
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },
});

export default function MyDocument({
    invoiceNumber,
    date,
    name,
    gender,
    products,
}) {
    products = products.filter(function (value, index, arr) {
        return value.productName && value.price && value.quantity;
    });
    products.reverse();

    let recentHistory = localStorage.getItem("history");
    !recentHistory && (recentHistory = '[]');
    recentHistory = JSON.parse(recentHistory);
    const objIndex = recentHistory.findIndex(
        (obj) => obj.invoiceNumber === invoiceNumber
    );

    if (objIndex >= 0) {
        recentHistory[objIndex] = {
            invoiceNumber,
            date,
            name,
            gender,
            products,
        };
    } else {
        recentHistory.push({
            invoiceNumber,
            date,
            name,
            gender,
            products,
        });
    }

    localStorage.setItem("history", JSON.stringify(recentHistory));

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View style={{ display: "flex" }}>
                    <Image
                        src={"../public/assets/memarica-logo-bg.jpg"}
                        style={{
                            marginTop: -100,
                            marginLeft: -100,
                            marginBottom: "-100vw",
                        }}
                    />
                </View>
                <Header invoiceNumber={invoiceNumber} date={date} />
                <View
                    style={{
                        flexDirection: "row-reverse",
                        flex: 1,
                    }}
                >
                    <Sidebar name={name} gender={gender} />
                    <View>
                        <Main products={products} />
                        <Footer />
                    </View>
                </View>
            </Page>
        </Document>
    );
}

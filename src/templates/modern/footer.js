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
const Footer = () => (
    <View style={{marginRight: "-28vw", paddingVertical: 20}}>
        <Image
            src={"/assets/main-full-typography-green.png"}
            style={{ height: 24, objectFit: "contain" }}
        />
    </View>
);

export default Footer;

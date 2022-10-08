import { Text, View } from "@react-pdf/renderer";
import { useEffect } from "react";

function RTLText({ children, margin, style }) {
    const splitedText = children.split(" ");

    return (
        <View style={{...style, flexWrap: "wrap", flexDirection: "row-reverse" }}>
            {splitedText.map((word, idx) => {
                return (
                    <Text style={{ marginLeft: margin || 2 }} key={idx}>
                        {word}
                    </Text>
                );
            })}
        </View>
    );
}

export default RTLText;

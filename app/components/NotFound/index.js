import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { BaseStyle, useTheme } from "@config";
import { useTranslation } from "react-i18next";
import Text from "@components/Text";
import Icon from "@components/Icon";
import { parseHexTransparency } from "@utils";

const NotFound = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.viewCart,
                    { backgroundColor: parseHexTransparency(colors.card, 80) },
                ]}
            >
                <Icon
                    name={"exclamation-triangle"}
                    style={{
                        fontSize: 32,
                        color: parseHexTransparency(colors.text, 30),
                    }}
                />
            </View>
            <Text
                headline
                bold
                style={{
                    color: parseHexTransparency(colors.text, 50),
                }}
            >
                {t("not_found")}
            </Text>
        </View>
    );
};

export default NotFound;

import { Text } from "@components";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useTheme, Images } from "@config";

const SearchResultLabel = ({
    style = {},
    title = "",
    textLeft = "",
    textRight = "",
    onPress = () => {},
    disabled = false
}) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { borderBottomColor: colors.border },
                style,
            ]}
            onPress={onPress}
        >
            <Text subhead light>
                {title}
            </Text>
            <View disabled={disabled} style={styles.content}>
                <Text body1>{textLeft}</Text>
                <Text body1>{textRight}</Text>
            </View>
        </TouchableOpacity>
    );
};

SearchResultLabel.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    textLeft: PropTypes.string,
    textRight: PropTypes.string,
    onPress: PropTypes.func,
};

export default SearchResultLabel;

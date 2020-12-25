import Icon from "@components/Icon";
import Text from "@components/Text";
import { useTheme } from "@config";
import { parseHexTransparency } from "@utils";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ListMenuIcon(props) {
    const { style, onPress, title, icon } = props;
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.contain, { borderColor: colors.border }, style]}
            onPress={onPress}
        >
            <Icon name={icon} size={18} solid color={colors.primaryLight} />
            <Text body1 style={{ flex: 1, paddingLeft: 10 }}>
                {title}
            </Text>
            <Icon name="angle-right" size={18} solid color={colors.primaryLight} />
        </TouchableOpacity>
    );
}

ListMenuIcon.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	onPress: PropTypes.func,
	icon: PropTypes.string,
	title: PropTypes.string
};

ListMenuIcon.defaultProps = {
    style: {},
    onPress: () => {},
    icon: "",
    title: "",
};

import Image from "@components/Image";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const CategoryList = (props) => {
    const { colors } = useTheme();
    const { style, onPress, image, title, subtitle, loading, isImageRound } =
        props;

    if (loading) {
        return <Loading style={style} />;
    }

    return (
        <TouchableOpacity
            style={[
                styles.contain,
                { backgroundColor: colors.background },
                style,
            ]}
            onPress={onPress}
            // activeOpacity={0.9}
        >
            <Image
                source={image}
                style={StyleSheet.flatten([
                    styles.imageWishlist,
                    isImageRound && styles.imageRound,
                ])}
            />
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
                <Text
                    headline
                    semibold
                    numberOfLines={2}
                    style={styles.paddingVertical5}
                >
                    {title}
                </Text>
                <Text light footnote semibold grayColor>
                    {subtitle}
                </Text>

                <View style={styles.contentRate} />
            </View>
        </TouchableOpacity>
    );
};

CategoryList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    image: PropTypes.node.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

CategoryList.defaultProps = {
    style: {},
    onPress: () => {},
    image: Images.channel1,
    title: "",
    subtitle: "",
    isRound: false,
};

export default CategoryList;

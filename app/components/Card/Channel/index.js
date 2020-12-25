import Image from "@components/Image";
import Text from "@components/Text";
import { Images } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

const CardChannel = (props) => {
  const { style, item, onPress, onPressTag } = props;
  const { image, title } = item;

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={styles.imageWishlist} />
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <Text body1 semibold numberOfLines={2} style={styles.marginVertical3}>
          {title}
        </Text>

        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

CardChannel.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
  type: PropTypes.string,
};

CardChannel.defaultProps = {
  style: {},
  onPress: () => {},
  onPressTag: () => {},
  item: {
    image: Images.channel1,
    title: "CNN",
  },
};

export default CardChannel;

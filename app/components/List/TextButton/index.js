import Icon from "@components/Icon";
import Image from "@components/Image";
import Text from "@components/Text";
import Tag from "@components/Tag";
import { useTheme } from "@config";
import { parseHexTransparency } from "@utils";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ListTextButton(props) {
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    name,
    description,
    styleName,
    styleDescription,
    onPressRight,
    componentRight,
    tagName,
  } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.contentLeft, styleLeft]}>
        <Image source={image} style={[styles.thumb, styleThumb]} />
        <View>
          <Text body1 numberOfLines={1} style={styleName}>
            {name}
          </Text>
          <Text
            footnote
            grayColor
            numberOfLines={1}
            style={[{ marginTop: 4 }, styleDescription]}
          >
            {description}
          </Text>
        </View>
      </View>
      <View style={[styles.contentRight, styleRight]}>
        {componentRight ? (
          componentRight
        ) : (
          <Tag onPress={onPressRight} outline>
            {tagName}
          </Tag>
        )}
      </View>
    </TouchableOpacity>
  );
}

ListTextButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  iconName: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onPressRight: PropTypes.func,
  tagName: PropTypes.string,
};

ListTextButton.defaultProps = {
  image: "",
  name: "",
  description: "",
  iconName: "mobile-alt",
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  style: {},
  onPress: () => {},
  onPressRight: () => {},
  tagName: "",
};

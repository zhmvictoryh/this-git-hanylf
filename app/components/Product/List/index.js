import Icon from "@components/Icon";
import Tag from "@components/Tag";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const List = ({
  description,
  title,
  style,
  image,
  costPrice,
  salePrice,
  onPress,
  salePercent,
  isFavorite = false,
  loading = false
}) => {
  const { colors } = useTheme();

  if(loading) {
    return <Loading style={style}/>;
  }

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={image}
        style={styles.imageWishlist}
        imageStyle={{ borderRadius: 8 }}
      >
        {salePercent ? (
          <Tag small style={styles.salePercentList}>
            {salePercent}
          </Tag>
        ) : null}
      </ImageBackground>
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <Text headline numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.viewText}>
          <Text footnote grayColor numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View style={styles.viewText}>
          <Text title3>{salePrice}</Text>
          <Text title3 grayColor style={styles.costPrice}>
            {costPrice}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Icon
            name="heart"
            solid={isFavorite}
            size={16}
            color={isFavorite ? colors.primary : colors.border}
          ></Icon>
        </View>
      </View>
    </TouchableOpacity>
  );
};

List.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
};

List.defaultProps = {
  description: "",
  title: "",
  style: {},
  image: Images.eProduct,
  costPrice: "",
  salePrice: "",
  salePercent: "",
  onPress: () => {},
  isFavorite: false,
};

export default List;

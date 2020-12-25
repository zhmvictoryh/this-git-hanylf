import Icon from "@components/Icon";
import Text from "@components/Text";
import { BaseColor, Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const Grid1 = ({
  description,
  title,
  style,
  image,
  costPrice,
  salePrice,
  onPress,
  isFavorite,
  loading = false
}) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style}/>;
  }

  return (
    <TouchableOpacity style={[styles.grid1, style]} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackgroundGrid1}
        imageStyle={{ borderRadius: 8 }}
      >
        <Icon
          name="heart"
          solid={isFavorite}
          size={16}
          color={isFavorite ? colors.primary : BaseColor.whiteColor}
          style={{ position: "absolute", top: 8, right: 8 }}
        ></Icon>
      </ImageBackground>

      <View>
        <Text subhead bold numberOfLines={2} style={{ marginTop: 10 }}>
          {title}
        </Text>
        <Text footnote grayColor style={{ marginTop: 10 }}>
          {description}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <Text subhead bold>
            {salePrice}
          </Text>
          <Text subhead grayColor style={styles.costPrice}>
            {costPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Grid1.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
};

Grid1.defaultProps = {
  description: "",
  title: "",
  style: {},
  image: Images.eProduct,
  costPrice: "",
  salePrice: "",
  onPress: () => {},
  isFavorite: false,
};

export default Grid1;

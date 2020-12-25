import Text from "@components/Text";
import Button from "@components/Button";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const CardBooking = ({
  style,
  description,
  price,
  secondDescription,
  textButton,
  onPress,
  loading = false
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderTopColor: colors.border }, style]}>
      <View style={{ flex: 1 }}>
        <Text caption1 grayColor>
          {description}
        </Text>
        {loading ? (
          <Loading/>
        ) : (
          <Text title3 semibold style={{ marginVertical: 4 }}>
            {price}
          </Text>
        )}
        <Text caption1 grayColor>
          {secondDescription}
        </Text>
      </View>
      <Button style={{ height: 45 }} onPress={onPress}>
        {textButton}
      </Button>
    </View>
  );
};

CardBooking.propTypes = {
  description: PropTypes.string,
  secondDescription: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

CardBooking.defaultProps = {
  description: "",
  secondDescription: "",
  price: "",
  style: {},
  onPress: () => {},
};

export default CardBooking;

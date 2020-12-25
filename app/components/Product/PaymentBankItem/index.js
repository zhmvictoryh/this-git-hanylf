import Image from "@components/Image";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

const PaymentBankItem = ({ image, isActive, title, style, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.paymentBankItem,
        { borderColor: isActive ? colors.primary : colors.border },
        style,
      ]}
      onPress={onPress}
    >
      <Image
        resizeMode="contain"
        source={image}
        style={styles.paymentBankItemLogo}
      />
      <Text caption1 style={{ marginTop: 8 }} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

PaymentBankItem.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isActive: PropTypes.bool,
  onPress: PropTypes.func,
};

PaymentBankItem.defaultProps = {
  image: Images.eProduct,
  title: "",
  style: {},
  isActive: false,
  onPress: () => {},
};

export default PaymentBankItem;

import Icon from "@components/Icon";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function FormCounterSelect(props) {
  const [value, setValue] = useState(props.value);
  const { style, onChange } = props;
  const { colors } = useTheme();

  const onHandleChange = (type) => {
    let valueNew = 0;
    if (type == "up") {
      valueNew = value + 1;
    } else {
      valueNew = value - 1 > 0 ? value - 1 : 0;
    }
    setValue(valueNew);
    onChange(valueNew);
  };

  return (
    <View
      style={[
        styles.contentPicker,
        {
          backgroundColor: colors.card,
          flexDirection: "row",
        },
        style,
      ]}
    >
      <TouchableOpacity onPress={() => onHandleChange("up")}>
        <Icon name="plus-circle" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text title2 style={{ width: 40, textAlign: "center" }}>
        {value}
      </Text>
      <TouchableOpacity onPress={() => onHandleChange("down")}>
        <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
      </TouchableOpacity>
    </View>
  );
}

FormCounterSelect.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  detail: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

FormCounterSelect.defaultProps = {
  style: {},
  label: "Adults",
  detail: ">= 12 years",
  value: 1,
  onChange: () => {},
};

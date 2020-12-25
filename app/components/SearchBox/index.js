import Icon from "@components/Icon";
import TextInput from "@components/TextInput";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const SearchBox = forwardRef((props, ref) => {
  const { onSubmitEditing, loading } = props;
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          ref={ref}
          style={styles.textInput}
          autoCorrect={false}
          placeholder={t("write_a_comment")}
          placeholderTextColor={BaseColor.grayColor}
          value={keyword}
          selectionColor={colors.primary}
          onSubmitEditing={onSubmitEditing(keyword)}
          onChangeText={(text) => setKeyword(text)}
        />
      </View>
      <View
        style={{
          width: 40,
          alignItems: "flex-end",
        }}
      >
        {loading ? (
          <View>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <TouchableOpacity onPress={onSubmitEditing(keyword)}>
            <Icon
              name="paper-plane"
              solid
              size={24}
              style={{ marginLeft: 15 }}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

SearchBox.propTypes = {
  onSubmitEditing: PropTypes.func,
  loading: PropTypes.bool,
  refSearchBox: PropTypes.any,
};

SearchBox.defaultProps = {
  onSubmitEditing: () => {},
  loading: false,
  refSearchBox: null,
};

export default SearchBox;

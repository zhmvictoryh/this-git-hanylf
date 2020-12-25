import React from "react";
import { View } from "react-native";
import { PlaceholderLine, Placeholder } from "@components";
import styles from "./styles";

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder>
      <View style={[styles.containLoading, style]}>
        <PlaceholderLine style={[styles.imageWishlist]} noMargin/>
        <View style={{ padding: 10, flex: 1 }}>
          <PlaceholderLine width={100} />
          <PlaceholderLine width={80} />
          <View style={{ flexDirection: "row" }}>
            <PlaceholderLine width={20} style={{ marginRight: 5 }} />
            <PlaceholderLine width={20} style={{ marginLeft: 5 }} />
          </View>
        </View>
      </View>
    </Placeholder>
  );
};

export default Loading;

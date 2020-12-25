import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { PlaceholderLine, Placeholder } from "@components";

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder>
      <View style={[styles.container, style]}>
        <PlaceholderLine style={styles.imageWishlist} noMargin/>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            paddingVertical: 5,
            justifyContent: "center"
          }}
        >
          <PlaceholderLine width={80} />
          <PlaceholderLine width={100} />
          <PlaceholderLine width={50} />
        </View>
      </View>
    </Placeholder>
  );
};

export default Loading;

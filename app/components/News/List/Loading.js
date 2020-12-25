import React from "react";
import { View } from "react-native";
import { PlaceholderLine, Placeholder } from "@components";
import styles from "./styles";

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder>
      <View style={[styles.contain, style]}>
        <PlaceholderLine style={[[styles.image]]} noMargin/>
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

import React from "react";
import { PlaceholderLine, Placeholder } from "@components";
import styles from "./styles";

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.contain, styles.loading, style]}>
      <PlaceholderLine style={styles.iconContent} />
      <PlaceholderLine width={100} noMargin />
    </Placeholder>
  );
};

export default Loading;

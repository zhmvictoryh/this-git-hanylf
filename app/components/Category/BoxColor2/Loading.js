import React from "react";
import { PlaceholderLine, Placeholder } from "@components";
import styles from "./styles";

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.containerLoading, style]}>
      <PlaceholderLine style={styles.loading} noMargin/>
    </Placeholder>
  );
};

export default Loading;

import React, { useRef } from "react";
import { Animated, StyleSheet, ViewProps } from "react-native";
import { AnimationContext } from "rn-placeholder";
// import * as RNPlaceholder from "rn-placeholder";
const START_VALUE = 0;
const END_VALUE = 100;
const DURATION = 1200;
const isInteraction = false;



const Progressive = ({
  style,
  color = "rgba(0,0,0,0.1)",
  children,
}) => {
  const animation = useRef(new Animated.Value(START_VALUE));

  const start = () => {
    Animated.sequence([
      Animated.timing(animation.current, {
        duration: DURATION,
        isInteraction,
        toValue: END_VALUE,
        useNativeDriver: false,
      }),
      Animated.timing(animation.current, {
        duration: DURATION,
        isInteraction,
        toValue: START_VALUE,
        useNativeDriver: false,
      }),
    ]).start((e) => {
      if (e.finished) {
        start();
      }
    });
  };

  React.useEffect(() => {
    start();
  }, []);

  const right = animation.current.interpolate({
    inputRange: [START_VALUE, END_VALUE],
    outputRange: ["0%", "100%"],
  });

  return (
    <AnimationContext.Provider
      value={[styles.animationStyle, style, { right, backgroundColor: color }]}
    >
      {children}
    </AnimationContext.Provider>
  );
};

const styles = StyleSheet.create({
  animationStyle: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
});

export default Progressive;
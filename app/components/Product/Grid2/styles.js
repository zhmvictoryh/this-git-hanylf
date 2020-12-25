import * as Utils from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  grid2: {
    paddingBottom: 8,
  },
  imageBackgroundGrid2: {
    width: "100%",
    height: Utils.scaleWithPixel(120),
  },
  costPrice: { paddingHorizontal: 8, textDecorationLine: "line-through" },
});

import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    height: 32,
    justifyContent: "center",
  },
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  inputItem: {
    flex: 6.5,
    paddingLeft: 10,
  },
  digiNumber: {
    flex: 6.5,
    marginLeft: 10,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

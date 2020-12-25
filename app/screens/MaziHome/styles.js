import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    containerScreens: {
        flex: 1,
        flexDirection: "row",
        borderTopWidth: 0.5,
    },
    itemLeftScreen: {
        alignItems: "center",
        paddingVertical: 10,
        // borderBottomWidth: 0.5,
        borderLeftWidth: 3,
    },
    itemRightScreen: {
        flexDirection: "row",
        paddingVertical: 10,
        marginLeft: 10,
        alignItems: "center",
    },
    contentRightScreen: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    }
});

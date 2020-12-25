import Button from "@components/Button";
import CategoryIconSoft from "@components/Category/IconSoft";
import Icon from "@components/Icon";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import { MaziListApp } from "@data";
import * as Utils from "@utils";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import Draggable from "react-native-draggable";
import Modal from "react-native-modal";
import styles from "./styles";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
let boundsData = { left: window.width - 70, top: window.height - 150 };

const AssistiveTouch = ({ goToApp = () => {} }) => {
    const { theme, colors } = useTheme();
    const [expand, setExpand] = useState(false);
    const { t } = useTranslation();
    const [orientation, setOrientation] = useState("PORTRAIT");

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const onChange = ({ window, screen }) => {
        const { width, height } = window;
        boundsData = { left: window.width - 70, top: window.height - 150 };
        if (width < height) {
            setOrientation("PORTRAIT");
        } else {
            setOrientation("LANDSCAPE");
        }
    };

    const onExpand = () => {
        Utils.enableExperimental();
        setExpand(true);
    };

    return (
        <Fragment>
            {!expand && (
                <Draggable
                    key={orientation}
                    x={boundsData.left}
                    y={boundsData.top}
                    minX={10}
                    minY={20}
                    onDragRelease={(event, gestureState, bounds) =>
                        (boundsData = {
                            left: event.nativeEvent.pageX,
                            top: event.nativeEvent.pageY,
                        })
                    }
                >
                    <Button
                        style={{
                            borderRadius: 20,
                            padding: 0,
                            borderRadius: 50,
                            paddingHorizontal: 0,
                            height: 60,
                            width: 60,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            opacity: 0.7,
                        }}
                        round
                        icon={
                            <Icon
                                name="dot-circle"
                                size={35}
                                color={BaseColor.fieldColor}
                            />
                        }
                        children=""
                        onPress={() => onExpand()}
                    />
                </Draggable>
            )}

            <Modal
                isVisible={expand}
                onSwipeComplete={() => {
                    setExpand(false);
                }}
                style={{ margin: 0 }}
                swipeDirection={["down"]}
            >
                <View
                    style={[
                        styles.contentFilterBottom,
                        { backgroundColor: colors.card },
                    ]}
                >
                    <View style={styles.contentSwipeDown}>
                        <View style={styles.lineSwipeDown} />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text headline style={{ flex: 1 }}>
                                Mazi
                            </Text>
                            <TouchableOpacity
                                style={{
                                    width: 30,
                                    alignItems: "flex-end",
                                }}
                                onPress={() => setExpand(false)}
                            >
                                <Icon name="times" size={14}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text caption1 grayColor>
                            React Native UI KITS
                        </Text>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        data={MaziListApp}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => {
                            if (item.id == "Common") {
                                return null;
                            }
                            return (
                                <View
                                    style={{
                                        flex: 1 / 4,
                                        marginTop: 20,
                                    }}
                                >
                                    <CategoryIconSoft
                                        isRound
                                        isBlack
                                        icon={item.icon}
                                        title={t(item.title)}
                                        onPress={() => {}}
                                        maxWidth={80}
                                        onPress={() => {
                                            goToApp(item.id);
                                            setExpand(false);
                                        }}
                                    />
                                </View>
                            );
                        }}
                    />
                </View>
            </Modal>
        </Fragment>
    );
};

export default AssistiveTouch;

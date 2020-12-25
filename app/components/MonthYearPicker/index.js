import Text from "@components/Text";
import { useTheme } from "@config";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "./styles";

export default function MonthYearPicker(props) {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const { style, onChange, date = new Date() } = props;
    const { colors } = useTheme();

    const openModal = () => {
        setModalVisible(true);
    };

    const handleDatePicked = (date) => {
        onChange(date);
        setModalVisible(false);
    };

    const hideDateTimePicker = () => {
        setModalVisible(false);
    };

    return (
        <View
            style={[
                styles.contentPickDate,
                { backgroundColor: colors.card },
                style,
            ]}
        >
            <DateTimePicker
                mode="date"
                date={date}
                isVisible={modalVisible}
                onConfirm={handleDatePicked}
                onCancel={hideDateTimePicker}
            />
            <TouchableOpacity
                style={styles.itemPick}
                onPress={() => openModal()}
            >
                <Text caption1 light style={{ marginBottom: 5 }}>
                    {t("month")}
                </Text>
                <Text headline semibold>
                    {moment(date).format("MM")}
                </Text>
            </TouchableOpacity>
            <View
                style={[styles.linePick, { backgroundColor: colors.border }]}
            />
            <TouchableOpacity
                style={styles.itemPick}
                onPress={() => openModal()}
            >
                <Text caption1 light style={{ marginBottom: 5 }}>
                    {t("year")}
                </Text>
                <Text headline semibold>
                    {moment(date).format("YYYY")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

MonthYearPicker.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
};

MonthYearPicker.defaultProps = {
    style: {},
    onChange: () => {},
};

import { ListThumbCircle, SafeAreaView, Text, Header, Icon } from "@components";
import { BaseStyle, useTheme } from "@config";
import { ENotificationData } from "@data";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View } from "react-native";

const EWishlist = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(ENotificationData);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <Header
          title={t("notification")}
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={colors.text}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => navigation.goBack()}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListThumbCircle
                style={{ marginBottom: 5 }}
                image={item.image}
                txtLeftTitle={item.txtLeftTitle}
                txtContent={item.txtContent}
                txtRight={item.txtRight}
                onPress={() => {}}
              />
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      edges={['right', 'top', 'left']}
    >
      {renderContent()}
    </SafeAreaView>
  );
};

export default EWishlist;

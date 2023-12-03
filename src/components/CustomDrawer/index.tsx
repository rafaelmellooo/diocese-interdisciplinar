import React from "react";
import { Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DrawerContentComponentProps,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";

import { useThemeStorage } from "../../ThemeStorageContext";
import { styles } from "./styles";

type CustomDrawerProps = DrawerContentComponentProps;

export default function CustomDrawer(props: CustomDrawerProps) {
  const { theme, toggleTheme } = useThemeStorage();

  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: "#0D2744",
        }}>
        <Text style={styles.headerText}>Diocese de Santos</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.darkModeContainer}>
        <Text
          style={[
            styles.darkModeText,
            {
              color: colors.text,
            },
          ]}>
          Modo Escuro
        </Text>

        <Switch
          trackColor={{
            true: "#0A1D33",
            false: "#F5F3F3",
          }}
          thumbColor={theme === "dark" ? "#F5F3F3" : "#0D2744"}
          onValueChange={() => toggleTheme(theme === "dark" ? "light" : "dark")}
          value={theme === "dark"}
        />
      </View>
    </View>
  );
}

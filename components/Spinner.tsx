import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { layouts } from "../styles";

export const Spinner = ({ is_loading }: SpinnerProps) => {
  if (!is_loading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#efefef" />
      <Text style={styles.text}>Reticulating spines (natively)...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layouts.col_c_c,
    flex: 1,
    gap: 32,
  },
  text: {
    color: "#efefef",
  },
});

export interface SpinnerProps {
  is_loading: boolean;
}

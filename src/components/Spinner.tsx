import React from "react";
import { StyleSheet, ActivityIndicator, Platform } from "react-native";

const Spinner: React.FC = () => (
  <ActivityIndicator size="large" color="#AEAEAE" style={styles.spinner} />
);

const styles = StyleSheet.create({
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});

export default Spinner;

import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}

const LoadingWrapper: React.FC<Props> = ({ isLoading, children }) => {
  const renderLoadingMsg = () => {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Loading...</Text>
      </View>
    );
  };

  return isLoading ? renderLoadingMsg() : <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
});

export default LoadingWrapper;

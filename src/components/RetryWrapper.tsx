import React from "react";
import { Text, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  children: React.ReactNode;
  showError: boolean;
  onRetryClick: () => void;
}

const RetryWrapper: React.FC<Props> = ({
  children,
  showError,
  onRetryClick,
}) => {
  const renderError = () => {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onRetryClick}>
          <View style={styles.button}>
            <Icon name="sync" color="#000" size={20} />
            <Text style={{ fontSize: 24 }}> Retry</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return showError ? renderError() : <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: 150,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4baa3e",
  },
});

export default RetryWrapper;

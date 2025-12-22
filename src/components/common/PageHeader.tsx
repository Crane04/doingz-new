import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Text weight="bold" style={styles.title}>
        {title}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: COLORS.light,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightGray,
  },
});

export default PageHeader;

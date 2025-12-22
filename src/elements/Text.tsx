import React from "react";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  weight?: "regular" | "medium" | "semibold" | "bold";
}

const fontMap = {
  regular: "Fredoka_400Regular",
  medium: "Fredoka_500Medium",
  semibold: "Fredoka_600SemiBold",
  bold: "Fredoka_700Bold",
};

const AppText: React.FC<AppTextProps> = ({
  weight = "regular",
  style,
  children,
  ...props
}) => {
  return (
    <Text {...props} style={[{ fontFamily: fontMap[weight] }, style]}>
      {children}
    </Text>
  );
};

export default AppText;

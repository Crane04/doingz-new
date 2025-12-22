import React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

interface AppImageProps extends ImageProps {
  rounded?: boolean;
}

const AppImage: React.FC<AppImageProps> = ({
  rounded = false,
  style,
  ...props
}) => {
  return (
    <Image
      {...props}
      style={[styles.image, rounded && styles.rounded, style]}
      resizeMode={props.resizeMode || "cover"}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  rounded: {
    borderRadius: 50,
  },
});

export default AppImage;

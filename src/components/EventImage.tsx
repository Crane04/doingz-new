import React from "react";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";
import COLORS from "../constants/colors";

interface EventImageProps {
  image?: ImageSourcePropType;
}

const EventImage: React.FC<EventImageProps> = ({ image }) => (
  <Image source={image} style={styles.image} resizeMode="cover" />
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.dark,
  },
});

export default EventImage;

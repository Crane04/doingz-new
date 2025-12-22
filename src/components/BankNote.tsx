// components/BankNote.tsx
import React from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Text from "elements/Text";

type BankNoteProps = {
  amount: number | string;
  onLayout?: (event: any) => void;
};

const BankNote: React.FC<BankNoteProps> = ({ amount, onLayout }) => {
  const { width: screenWidth } = useWindowDimensions();

  // This is the magic: fixed aspect ratio (real banknotes are ~2.3:1)
  const MAX_NOTE_WIDTH = screenWidth * 0.9; // 90% of screen width
  const NOTE_WIDTH = Math.min(MAX_NOTE_WIDTH, 420); // Cap at 420px (great on web/tablet)
  const NOTE_HEIGHT = NOTE_WIDTH / 2.0; // Perfect banknote ratio

  const formatted =
    typeof amount === "number" ? amount.toLocaleString() : String(amount);

  return (
    <View style={{ alignSelf: "center" }} onLayout={onLayout}>
      <ImageBackground
        source={require("../../assets/note.jpeg")}
        style={{
          width: NOTE_WIDTH,
          height: NOTE_HEIGHT,
        }}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Top Row */}
          <View style={styles.row}>
            <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
              ₦{formatted}
            </Text>
            <Text style={[styles.brand, styles.alignRight]}>doingz</Text>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom Row */}
          <View style={styles.row}>
            <Text style={styles.brand}>doingz</Text>
            <Text
              style={[styles.amount, styles.alignRight]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              ₦{formatted}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 16,
  },
  container: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignRight: {
    textAlign: "right",
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    opacity: 0.95,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});

export default BankNote;

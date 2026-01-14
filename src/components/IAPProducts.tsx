import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";
import useIAPHandler from "hooks/useIAP";
import { useVersion } from "contexts/VersionContext";

const IAPProducts: React.FC = () => {
  const { products, handlePurchase } = useIAPHandler();
  const { version } = useVersion();
  if (!products || products.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {products.map((product, i) => (
          <TouchableOpacity
            key={product.id}
            style={styles.card}
            onPress={() => {
              handlePurchase(product.id);
            }}
          >
            <Text style={styles.price}>{product.displayPrice}</Text>

            {product.description ? (
              <Text style={styles.desc}>{product.description}</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.light,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "48%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  name: {
    fontSize: 12,
    color: COLORS.light,
    marginTop: 4,
  },
  desc: {
    fontSize: 11,
    color: COLORS.lightGray,
    marginTop: 2,
  },
});

export default IAPProducts;

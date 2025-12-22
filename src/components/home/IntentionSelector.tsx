import { View, TouchableOpacity } from "react-native";
import Text from "elements/Text";
import { IntentionSelectorProps } from "types/event";
import { createEvent as styles } from "styles";

const IntentionSelector: React.FC<IntentionSelectorProps> = ({
  intention,
  setIntention,
}) => (
  <View style={{ display: "none" }}>
    <Text style={styles.sectionTitle}>Event Intention</Text>
    <View style={styles.intentionButtons}>
      {["spray", "tickets", "both"].map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.intentionButton,
            intention === type && styles.activeIntention,
          ]}
          onPress={() => setIntention(type as "spray" | "tickets" | "both")}
        >
          <Text style={styles.intentionText}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default IntentionSelector;

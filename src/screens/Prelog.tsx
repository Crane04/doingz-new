import AuthButtons from "components/AuthButtons";
import { AppImage } from "elements";
import { StyleSheet, Text, View } from "react-native";
import { prelog as styles } from "styles";
import Disclaimer from "components/Disclaimer";

const Prelog: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <AppImage
          source={require("../../assets/logo.png")}
          style={styles.image}
        />

        <AuthButtons />
      </View>

      <Disclaimer />
    </View>
  );
};

export default Prelog;

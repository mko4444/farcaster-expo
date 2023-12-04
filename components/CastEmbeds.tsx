import { Image, Pressable, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

export function CastEmbeds({ embeds }: { embeds: any[] }) {
  return (
    embeds?.[0]?.url.includes("imgur") && (
      <Pressable key={embeds[0].url} onPress={() => Linking.openURL(embeds[0].url)} style={{ width: "100%" }}>
        <Image source={{ uri: embeds[0].url }} style={styles.embedImage} />
      </Pressable>
    )
  );
}

const styles = StyleSheet.create({
  embedImage: {
    marginVertical: 0,
    objectFit: "cover",
    height: 164,
    width: "100%",
    borderRadius: 10,
  },
});

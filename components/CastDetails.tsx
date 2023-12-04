import { Text, View, StyleSheet } from "react-native";
import { layouts } from "../styles";

export function CastDetails({ name, username, timestamp }: CastDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text />
      <Text style={styles.subtext}>@{username}</Text>
      <Text style={styles.subtext}>•</Text>
      <Text style={styles.subtext}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...layouts.row_fs_c,
    gap: 3,
  },
  text: {
    fontWeight: "700",
    color: "white",
    fontSize: 15,
  },
  subtext: {
    fontWeight: "400",
    color: "white",
    fontSize: 15,
    opacity: 0.5,
  },
});

export interface CastDetailsProps {
  name: string;
  username: string;
  timestamp: string;
}

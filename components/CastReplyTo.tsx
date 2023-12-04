import { Text, StyleSheet } from "react-native";

export function CastReplyTo({ username }: CastReplyToProps) {
  if (!username) return null;

  return (
    username && (
      <Text style={styles.container}>
        <Text style={styles.text}>Replying to </Text>
        <Text style={styles.link}>{username}</Text>
      </Text>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "500",
    fontSize: 15,
  },
  text: {
    color: "white",
    opacity: 0.5,
  },
  link: {
    color: "white",
    fontWeight: "500",
  },
});

export interface CastReplyToProps {
  username: string;
}

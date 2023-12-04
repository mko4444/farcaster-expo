import { Text, StyleSheet } from "react-native";

export function CastReplyTo({ username, fid }: CastReplyToProps) {
  if (!username) return null;

  return (
    (username || fid) && (
      <Text style={styles.container}>
        <Text style={styles.text}>Replying to </Text>
        <Text style={styles.link}>{username ? `@${username}` : fid}</Text>
      </Text>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "400",
    fontSize: 15,
    marginTop: 2,
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
  username?: string;
  fid?: string;
}

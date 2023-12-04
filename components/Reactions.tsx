import { Pressable, StyleSheet, Text, View } from "react-native";
import { like, recast, reply } from "../svg";
import { layouts } from "../styles";

export function Reactions({ num_likes, num_replies, num_recasts }: ReactionsProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.reaction}>
        {reply}
        <Text style={styles.text}>{num_replies}</Text>
      </Pressable>
      <Pressable style={styles.reaction}>
        {recast}
        <Text style={styles.text}>{num_recasts}</Text>
      </Pressable>
      <Pressable style={styles.reaction}>
        {like}
        <Text style={styles.text}>{num_likes}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...layouts.row_sb_c,
    gap: 24,
    opacity: 0.5,
    marginTop: 14,
  },
  reaction: {
    ...layouts.row_c_c,
    gap: 8,
    padding: 0,
    margin: 0,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});

export interface ReactionsProps {
  num_likes: number;
  num_replies: number;
  num_recasts: number;
}

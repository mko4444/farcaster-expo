import { Pressable, StyleSheet, Text, View } from "react-native";
import { like, recast, reply } from "../svg";
import { layouts } from "../styles";

export function ReactionsBar({ num_likes, num_replies, num_recasts }: ReactionsProps) {
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
    ...layouts.row_sa_c,
    paddingHorizontal: 40,
    width: layouts.max.width,
    backgroundColor: "#efefef10",
    paddingVertical: 14,
    opacity: 0.5,
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

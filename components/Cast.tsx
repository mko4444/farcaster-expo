import { Image, Text, View, StyleSheet } from "react-native";
import { CastReplyTo } from "./CastReplyTo";
import { getRelativeTime } from "../utils";
import { CastEmbeds } from "./CastEmbeds";
import { Reactions } from "./Reactions";
import { CastText } from "./CastText";
import { layouts } from "../styles";
import { Link } from "expo-router";
import { CastDetails } from "./CastDetails";
import { useMemo } from "react";

export default function Cast({
  parent_author,
  author,
  timestamp,
  text,
  hash,
  reactions,
  recasts,
  replies,
  hide_reactions,
  show_rail,
  no_border,
  embeds,
  no_top_padding,
}: CastProps) {
  const num_likes = (reactions?.count || reactions?.likes?.length) ?? 0;
  const num_recasts = (recasts?.count || reactions?.recasts?.length) ?? 0;
  const num_replies = replies?.count ?? 0;
  const reaction_props = { num_likes, num_recasts, num_replies };

  return useMemo(
    () => (
      <Link href={{ pathname: "/cast/[hash]", params: { hash } }} style={styles.cast_link}>
        <View
          style={{
            ...styles.cast_container,
            paddingTop: no_top_padding ? 0 : undefined,
            borderBottomColor: no_border ? "transparent" : "#efefef15",
          }}
        >
          <View style={layouts.col_fs_c}>
            <Image source={{ uri: author?.pfp_url ?? author?.pfp?.url }} style={styles.author_image} />
            {show_rail && <View style={styles.rail} />}
          </View>
          <View style={styles.content_container}>
            <CastDetails
              name={author?.display_name ?? author?.displayName}
              username={author?.username}
              timestamp={getRelativeTime(timestamp)}
            />
            <CastReplyTo username={parent_author?.username} fid={parent_author?.fid ?? parent_author?.id} />
            <CastText text={text} />
            <CastEmbeds embeds={embeds} />
            {!hide_reactions ? <Reactions {...reaction_props} /> : undefined}
          </View>
        </View>
      </Link>
    ),
    [hash]
  );
}

const styles = StyleSheet.create({
  cast_link: {
    width: layouts.max.width,
    marginBottom: 0,
  },
  cast_container: {
    ...layouts.row,
    padding: 14,
    width: "100%",
    gap: 14,
    borderBottomWidth: 1,
    backgroundColor: "#1D1928",
  },
  author_image: {
    height: 44,
    width: 44,
    borderRadius: 100,
  },
  rail: {
    width: 2,
    borderRadius: 100,
    marginTop: 8,
    flex: 1,
    backgroundColor: "#efefef25",
  },
  content_container: {
    ...layouts.col,
    gap: 0,
    flex: 1,
  },
  authorName: {
    flex: 0,
    fontWeight: "700",
    color: "white",
    fontSize: 15,
  },
  author_details: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
    opacity: 0.5,
  },
});

export interface CastProps {
  parent_author: any;
  author: any;
  timestamp: string;
  text: string;
  hash: string;
  reactions?: any;
  recasts?: any;
  replies?: any;
  hide_reactions?: boolean;
  show_rail?: boolean;
  no_border?: boolean;
  embeds?: any;
  no_top_padding?: boolean;
}

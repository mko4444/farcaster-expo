import { RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Cast as CastType } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { ReactionsBar } from "../../components/ReactionsBar";
import { Stack, useLocalSearchParams } from "expo-router";
import { Spinner } from "../../components/Spinner";
import Cast from "../../components/Cast";
import { layouts } from "../../styles";
import { fetcher } from "../../utils";
import useSWR from "swr";
import dayjs from "dayjs";
import { API_URL } from "../../constants";

export default function CastPage() {
  const { hash } = useLocalSearchParams();
  const { data, isValidating, mutate } = useSWR("/thread/" + hash, () => fetcher(API_URL + "/thread/" + hash), {
    refreshInterval: 0,
  });

  const isLoadingInit = !data?.result?.casts && isValidating;
  const casts = data?.result?.casts ?? [];

  const cast = findCastByHash(hash);
  const lineage = getCastLineage(hash).filter((f: any) => f.hash !== hash);
  const replies = casts.filter((c: any) => c?.parent_hash === hash || c?.parentHash === hash);

  function getCastLineage(hash: any, lineage: any = []) {
    const item = findCastByHash(hash);
    if (!item) return lineage;
    lineage.push(item);
    if (item?.parent_hash || item?.parentHash) {
      return getCastLineage(item?.parent_hash || item?.parentHash, lineage);
    }
    return lineage;
  }

  function findCastByHash(hash: any) {
    return casts?.find((item: any) => item.hash === hash);
  }

  return (
    <SafeAreaView
      style={{
        ...layouts.col_fs_c,
        height: layouts.max.height,
        backgroundColor: "#1D1928",
      }}
    >
      <Stack.Screen
        options={{
          title: "Conversation",
          headerStyle: { backgroundColor: "#1D1928" },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          headerBackTitle: "Back",
          headerTintColor: "white",
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, gap: 0 }}
        refreshControl={<RefreshControl refreshing={isValidating && casts?.length > 0} onRefresh={() => mutate()} />}
      >
        <View style={{ height: 6 }} />
        {lineage?.length > 0 &&
          lineage
            .sort((a: any, b: any) => (dayjs(b.timestamp).isBefore(a.timestamp) ? 1 : -1))
            .map((c: CastType) => <Cast key={c.hash} show_rail no_border {...c} />)}
        {isLoadingInit ? (
          <Spinner is_loading={isLoadingInit} />
        ) : (
          <Cast no_top_padding={lineage?.length > 0} no_border hide_reactions {...cast} />
        )}
        {!isLoadingInit && (
          <ReactionsBar
            num_likes={cast?.reactions?.count ?? 0}
            num_recasts={cast?.recasts?.count ?? 0}
            num_replies={cast?.replies?.count ?? 0}
          />
        )}
        <View style={{ height: 6, width: layouts.max.width }} />
        {replies.map((c: CastType) => (
          <Cast {...c} key={c.hash} parent_author={{ username: cast?.author?.username }} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

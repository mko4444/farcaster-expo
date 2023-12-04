import { FlatList, RefreshControl, SafeAreaView, View } from "react-native";
import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import Cast from "../components/Cast";
import { Stack } from "expo-router";
import { layouts } from "../styles";
import { fetcher } from "../utils";
import useSWR from "swr";
import { API_URL } from "../constants";

export default function Page() {
  const [next, setNext] = useState(null);
  const [casts, setCasts] = useState<any>([]);

  const { data, isValidating, mutate } = useSWR(
    "/feed",
    () => fetcher(`${API_URL}/feed${next ? `?cursor=${next}` : ""}`),
    {
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    setCasts([...casts, ...(data?.casts ?? [])]);
    setNext(data?.next?.cursor);
  }, [data]);

  const isLoadingInit = !data?.casts && isValidating;

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
          title: "Feed",
          headerStyle: {
            backgroundColor: "#1D1928",
          },
          statusBarHidden: true,
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          headerTitle: "Trending Casts",
        }}
      />
      <View style={{ height: 1, width: "100%", backgroundColor: "#efefef15" }} />
      <Spinner is_loading={isLoadingInit} />
      {!isLoadingInit && (
        <FlatList
          data={casts}
          renderItem={({ item }) => <Cast {...item} />}
          keyExtractor={(item, index) => item.hash + index}
          refreshControl={
            <RefreshControl refreshing={isValidating && data?.casts?.length > 0} onRefresh={() => mutate()} />
          }
          onEndReachedThreshold={0.75}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, gap: 0 }}
          onEndReached={mutate}
        />
      )}
    </SafeAreaView>
  );
}

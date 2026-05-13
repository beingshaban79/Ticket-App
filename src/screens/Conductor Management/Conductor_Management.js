import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const DATA = [
  {
    id: "1",
    name: "John Appleseed",
    code: "CND-007",
    status: "Active",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtNjs3avFgDSFBzev1lUO-NwL9o1BytmVdKXqOSWiUQx8jb-7guJ9ocG1GfV9O51-1A_jTovLA51Z_WUm1jG821UbPtZCZavm_YW-Nz2qqsYg5zm6d90Emz9janBkPxamKyWrXqY5H1g5Q6iL__JpZl4fG7ZNgwU_ZpuyR_chuz24hdVM9FNrqLZoMhGVjexqMLxDNKhSWyCEmkuZKGJOiTVfNw4qNoasoulgYCPjbCYh5UXo4bh97ZxdSulKf1-N13NaVHfrtYH32",
  },
  {
    id: "2",
    name: "Jane Doe",
    code: "CND-008",
    status: "Active",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwmljeM7mMwijcaDt3njCJywOWDwYE8qsxo3tBU4HnDzmC2O4-u4cbqxF-O0_q9Dl0js3Ur9OLbEI19NuNFwnchjU1U8Bo8Xt_3Ag-og3xPZohxhsGTP3typB996ZYB9ghzjzyUi6yMqul8W0hqPraer-DGYBzBLcGtJI3Hu-BCjjMgU-OoWN3wOuqEUX_IptvoTgtZaywLtY1daSUgll4z5IJK2IcuGlXHhc7u2V3MjLWlMYhTbvIZ9r2JlFs0_ZAfetJ_7F4oDA-",
  },
  {
    id: "3",
    name: "Peter Jones",
    code: "CND-009",
    status: "Inactive",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz6h7sy4xKvt0FzOWf8Xig6oflp3EDVf6BlT8OwxGo8g9qC1CMbDF_TAMmZIwEA2K8XCUq7XYO2VaGionJ891nXewoYsdHwZy0MViJLRmscmCIpvycbQv7baiA9Z9gYSr0GGYLOedO0z0qvbVYU9goxp6MxcB8DbxoIE-JmSS7ERW5kvQsrISA_aOzqhXqJkt3nLiFxJ8NTf1W1KnBR3yFnNwSWRP2FvN06EZCpLGrGrP9Mo9ic9nI2gMDnEJmj2b2rd4Nn80KqSzl",
  },
  {
    id: "4",
    name: "Maria Garcia",
    code: "CND-010",
    status: "Active",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4nAf4rXlXhbN0T-nv_ez2uJKUGfwdfu9yoIVSQhvV4A9te-KuzA9fyqrD-pWf5LNQFmxodyutcjATYeBoNntgHxcdaKo9bMP77pEBbgdSof6OoxI5y-HNHMYMdarPRPYmm94uXr0l7eQ2Tvmj8Mgc0RfNjcb_-N6zAwFKoDSwyQDOt3UxHPj252fXaKOU0E2tYYShDZA-29p8uEE_vBLc5R1xa2LypgyozUGfBzKwHQbzCw9trdr0LNbGuTxNfLyPTInrqkIYiz2w",
  },
];

/* ── Sub-component ── */

const ConductorCard = ({ item }) => {
  const isActive = item.status === "Active";
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.code}>ID: {item.code}</Text>
      </View>
      <View style={styles.right}>
        <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeInactive]}>
          <Text style={[styles.badgeText, isActive ? styles.badgeTextActive : styles.badgeTextInactive]}>
            {item.status}
          </Text>
        </View>
        <MaterialIcons name="more-vert" size={22} color="#64748b" />
      </View>
    </View>
  );
};

/* ── Screen ── */

const ConductorManagement = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>

    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
        <MaterialIcons name="arrow-back" size={24} color="#64748b" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Conductor Credentials</Text>
      <TouchableOpacity style={styles.searchBtn}>
        <MaterialIcons name="search" size={24} color="#137fec" />
      </TouchableOpacity>
    </View>

    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ConductorCard item={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />

    {/* FAB */}
    <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
      <MaterialIcons name="add" size={30} color="#fff" />
    </TouchableOpacity>

  </SafeAreaView>
);

export default ConductorManagement;

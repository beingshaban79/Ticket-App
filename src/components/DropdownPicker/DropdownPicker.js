import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

/**
 * DropdownPicker
 *
 * Props:
 *  label       : string           — field label e.g. "From"
 *  placeholder : string           — shown when nothing selected
 *  value       : string | null    — selected value (controlled)
 *  items       : string[]         — list of options (from API or static)
 *  onChange    : (item) => void   — called when user picks an item
 *  loading     : bool             — shows loading state
 */
const DropdownPicker = ({
  label,
  placeholder = "Select...",
  value,
  items = [],
  onChange,
  loading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    onChange?.(item);
    setOpen(false);
    setSearch("");
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      {/* Trigger */}
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.value, !value && styles.placeholder]}>
          {loading ? "Loading..." : value || placeholder}
        </Text>
        <MaterialIcons name="unfold-more" size={20} color="#9e9e9e" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>

            {/* Sheet header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <MaterialIcons name="close" size={22} color="#212121" />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchWrapper}>
              <MaterialIcons name="search" size={18} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#9e9e9e"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            </View>

            {/* List */}
            <FlatList
              data={filtered}
              keyExtractor={(item, i) => `${item}-${i}`}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, value === item && styles.itemActive]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.itemText, value === item && styles.itemTextActive]}>
                    {item}
                  </Text>
                  {value === item && (
                    <MaterialIcons name="check" size={18} color="#137fec" />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.empty}>No results found.</Text>
              }
            />

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DropdownPicker;

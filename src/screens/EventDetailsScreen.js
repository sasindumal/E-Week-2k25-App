import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';
import { fetchEventById } from '../services/api';

const EventDetailsScreen = ({ route }) => {
  const { eventId } = route.params || {};
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEventById(eventId);
        setEvent(data);
      } catch (e) {
        console.warn('Event details load error', e?.message || e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color={COLORS.PRIMARY_RED} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={{ color: COLORS.PRIMARY_DARK }}>Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="calendar" size={20} color={COLORS.PRIMARY_RED} />
          <Text style={styles.title}>{event.title}</Text>
        </View>
        <Text style={styles.meta}>📅 {new Date(event.date).toLocaleDateString()}  ⏰ {event.time}</Text>
        <Text style={styles.meta}>📍 {event.location}</Text>
        {event.description ? (
          <Text style={styles.description}>{event.description}</Text>
        ) : null}
        {event.category ? (
          <Text style={styles.badge}>Category: {event.category}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.LIGHT,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { marginLeft: 8, fontSize: 18, fontWeight: 'bold', color: COLORS.PRIMARY_DARK },
  meta: { marginTop: 6, color: COLORS.GRAY_DARK, fontSize: 14 },
  description: { marginTop: 12, color: COLORS.PRIMARY_DARK, fontSize: 14 },
  badge: { marginTop: 12, color: COLORS.PRIMARY_RED, fontWeight: '600' },
});

export default EventDetailsScreen;



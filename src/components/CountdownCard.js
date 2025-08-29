import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';
import { useEventStatus } from '../hooks/useEventStatus';

const pad2 = (n) => String(n).padStart(2, '0');

const LivePill = () => {
  const pulse = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.livePill}>
      <Animated.View style={[styles.liveDot, { opacity: pulse }]} />
      <Text style={styles.liveText}>LIVE NOW</Text>
    </View>
  );
};

const CountdownGrid = ({ timeLeft }) => (
  <View style={styles.gridRow}>
    {[
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Minutes', value: timeLeft.minutes },
      { label: 'Seconds', value: timeLeft.seconds },
    ].map((u) => (
      <View key={u.label} style={styles.gridItem}>
        <Text style={styles.gridNumber}>{pad2(u.value)}</Text>
        <Text style={styles.gridLabel}>{u.label}</Text>
      </View>
    ))}
  </View>
);

/**
 * CountdownCard
 * Props:
 * - startDate: string | Date (event start)
 * - endDate: string | Date (event end)
 * - titleUpcoming?: string
 * - titleLive?: string
 * - captionUpcoming?: string
 * - captionLive?: string
 */
const CountdownCard = ({
  startDate,
  endDate,
  titleUpcoming = 'Countdown to E-Week 2K25',
  titleLive = 'Time Until E-Week 2K25 Ends',
  captionUpcoming = 'July 30 - August 3, 2025 • Faculty of Engineering • University of Jaffna',
  captionLive = 'The Odyssey Continues • Faculty of Engineering • University of Jaffna',
}) => {
  const { status, timeLeft } = useEventStatus(startDate, endDate);

  if (status === 'concluded') {
    return (
      <LinearGradient colors={GRADIENTS.PRIMARY} style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="rocket" size={24} color={COLORS.PRIMARY_WHITE} />
          <Text style={styles.headerTitle}>E-Week 2K25</Text>
        </View>
        <Text style={styles.concludedTitle}>E-WEEK 2K25 HAS CONCLUDED!</Text>
        <Text style={styles.concludedSub}>Thank you for an amazing journey! 🎉</Text>
        <Text style={styles.concludedSub}>The warriors have written their history. Until next time! ⚔️</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={GRADIENTS.PRIMARY} style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="rocket" size={24} color={COLORS.PRIMARY_WHITE} />
        <Text style={styles.headerTitle}>{status === 'live' ? titleLive : titleUpcoming}</Text>
      </View>

      {status === 'live' && <LivePill />}

      <CountdownGrid timeLeft={timeLeft} />

      <Text style={styles.caption}>{status === 'live' ? captionLive : captionUpcoming}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    ...SHADOWS.MEDIUM,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginBottom: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  liveText: {
    color: '#FCA5A5',
    fontWeight: '600',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    marginTop: 6,
  },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  gridNumber: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 28,
    fontWeight: 'bold',
  },
  gridLabel: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.85,
    marginTop: 4,
  },
  caption: {
    color: COLORS.PRIMARY_WHITE,
    opacity: 0.9,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
  concludedTitle: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  concludedSub: {
    color: COLORS.PRIMARY_WHITE,
    opacity: 0.9,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default CountdownCard;

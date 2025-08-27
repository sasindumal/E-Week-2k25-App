import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';
import { fetchUpcomingEvents, fetchLiveLeaderboard, fetchDemoLeaderboard } from '../services/api';

const { width, height } = Dimensions.get('window');

// Static mapping of batch codes to logo assets
const BATCH_LOGOS = {
    E21: require('../../assets/e21.jpg'),
    E22: require('../../assets/e22.png'),
    E23: require('../../assets/e23.png'),
    E24: require('../../assets/e24.png'),
};

const DashboardScreen = ({ navigation }) => {
    const targetDate = new Date("2025-08-30T08:00:00").getTime();
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeRemaining({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // Leaderboard data (fetched)
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

    // Events (fetched)
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Load leaderboard and events
    const loadData = async () => {
        setRefreshing(true);
        try {
            setLoadingEvents(true);
            const events = await fetchUpcomingEvents();
            const mappedEvents = (Array.isArray(events) ? events : [])
                .map((e) => ({
                    id: e._id || e.id,
                    title: e.title,
                    date: e.date,
                    time: e.time,
                    location: e.location,
                }))
                .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
                .slice(0, 5);
            setUpcomingEvents(mappedEvents);
        } catch (error) {
            console.warn('Dashboard load error (events)', error?.message || error);
        } finally {
            setLoadingEvents(false);
        }

        try {
            setLoadingLeaderboard(true);
            let lb = [];
            try {
                lb = await fetchLiveLeaderboard();
            } catch (e) {
                lb = await fetchDemoLeaderboard();
            }
            let mappedLb = [];
            if (Array.isArray(lb)) {
                mappedLb = lb.map((row, idx) => ({
                    batch: row.batch || row.team || `Team ${idx + 1}`,
                    points: row.points || row.score || 0,
                    position: row.position || row.rank || idx + 1,
                }));
            } else if (lb && typeof lb === 'object') {
                const candidates = [
                    { batch: 'E21', points: Number(lb.E21Points || 0) },
                    { batch: 'E22', points: Number(lb.E22Points || 0) },
                    { batch: 'E23', points: Number(lb.E23Points || 0) },
                    { batch: 'E24', points: Number(lb.E24Points || 0) },
                ];
                mappedLb = candidates
                    .sort((a, b) => b.points - a.points)
                    .map((row, idx) => ({ ...row, position: idx + 1 }));
            }
            setLeaderboardData(mappedLb);
        } catch (error) {
            console.warn('Dashboard load error (leaderboard)', error?.message || error);
        } finally {
            setLoadingLeaderboard(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Sponsors
    const [sponsors] = useState([
        { id: 1, name: 'MELWA', logo: require('../../assets/Melwa.jpeg') },
    ]);

    const sponsorScrollRef = useRef(null);
    const scrollX = useRef(0);
    const sponsorCardWidth = 320 + 12;

    // Auto-scroll sponsors
    useEffect(() => {
        const interval = setInterval(() => {
            if (sponsorScrollRef.current && sponsors.length > 0) {
                scrollX.current += sponsorCardWidth;

                if (scrollX.current >= sponsorCardWidth * sponsors.length) {
                    scrollX.current = 0;
                }

                sponsorScrollRef.current.scrollTo({
                    x: scrollX.current,
                    animated: true,
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [sponsors]);

    // Countdown card
    const renderCountdownCard = () => {
        // Check if all time values are zero
        if (timeRemaining.days === 0 && 
            timeRemaining.hours === 0 && 
            timeRemaining.minutes === 0 && 
            timeRemaining.seconds === 0) {
            return null; // Hide the countdown card
        }

        return (
            <LinearGradient colors={GRADIENTS.PRIMARY} style={styles.countdownCard}>
                <View style={styles.countdownHeader}>
                    <Ionicons name="rocket" size={24} color={COLORS.PRIMARY_WHITE} />
                    <Text style={styles.countdownTitle}>E-Week 2025 Countdown</Text>
                </View>
                <Text style={styles.odysseyText}>ODYSSEY BEGINS IN</Text>
                <View style={styles.timeContainer}>
                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{timeRemaining.days}</Text>
                        <Text style={styles.timeLabel}>DAYS</Text>
                    </View>
                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{timeRemaining.hours}</Text>
                        <Text style={styles.timeLabel}>HOURS</Text>
                    </View>
                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{timeRemaining.minutes}</Text>
                        <Text style={styles.timeLabel}>MINS</Text>
                    </View>
                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{timeRemaining.seconds}</Text>
                        <Text style={styles.timeLabel}>SECS</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    };

    // Leaderboard
    const renderLeaderboard = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Ionicons name="trophy" size={20} color={COLORS.PRIMARY_RED} />
                <Text style={styles.sectionTitle}>Live Leaderboard</Text>
            </View>
            <View style={styles.leaderboardContainer}>
                {loadingLeaderboard && (
                    <View style={{ paddingVertical: 12 }}>
                        <ActivityIndicator size="small" color={COLORS.PRIMARY_RED} />
                    </View>
                )}
                {!loadingLeaderboard && leaderboardData.slice(0, 3).map((item, index) => (
                    <View key={item.batch} style={[styles.leaderboardItem, index === 0 && styles.firstPlace]}>
                        <View style={styles.rankContainer}>
                            <Text style={[styles.rankText, index === 0 && styles.firstPlaceText]}>
                                #{item.position}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            {BATCH_LOGOS[item.batch] && (
                                <Image source={BATCH_LOGOS[item.batch]} style={styles.batchLogo} resizeMode="cover" />
                            )}
                            <Text style={[styles.batchText, index === 0 && styles.firstPlaceText]}>
                                {item.batch}
                            </Text>
                        </View>
                        <Text style={[styles.pointsText, index === 0 && styles.firstPlaceText]}>
                            {item.points} pts
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );

    // Events
    const renderUpcomingEvents = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={20} color={COLORS.PRIMARY_RED} />
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
            </View>
            {loadingEvents && (
                <View style={{ paddingVertical: 12 }}>
                    <ActivityIndicator size="small" color={COLORS.PRIMARY_RED} />
                </View>
            )}
            {!loadingEvents && upcomingEvents.map(event => (
                <TouchableOpacity
                    key={event.id}
                    style={styles.eventCard}
                    onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
                >
                    <View style={styles.eventDateContainer}>
                        <Text style={styles.eventDate}>{new Date(event.date).getDate()}</Text>
                        <Text style={styles.eventMonth}>
                            {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventTime}>{event.time} • {event.location}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_MEDIUM} />
                </TouchableOpacity>
            ))}
        </View>
    );

    // Sponsors
    const renderSponsors = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Ionicons name="business" size={20} color={COLORS.PRIMARY_RED} />
                <Text style={styles.sectionTitle}>Our Sponsors</Text>
            </View>
            <ScrollView
                ref={sponsorScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.sponsorScroll}
            >
                {sponsors.map((sponsor) => (
                    <View key={sponsor.id} style={styles.sponsorCard}>
                        <Image
                            source={sponsor.logo}
                            style={styles.sponsorLogo}
                            resizeMode="contain"
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadData} colors={[COLORS.PRIMARY_RED]} />
                }
            >
                {renderCountdownCard()}
                {renderLeaderboard()}
                {renderUpcomingEvents()}
                {renderSponsors()}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1, padding: 16 },
    countdownCard: {
        alignItems: 'center',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        ...SHADOWS.MEDIUM,
    },
    countdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    countdownTitle: {
        color: COLORS.PRIMARY_WHITE,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    odysseyText: {
        color: COLORS.PRIMARY_WHITE,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.9,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeBlock: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
    },
    timeNumber: {
        color: COLORS.PRIMARY_WHITE,
        fontSize: 24,
        fontWeight: 'bold',
    },
    timeLabel: {
        color: COLORS.PRIMARY_WHITE,
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
        opacity: 0.8,
    },
    sectionContainer: {
        backgroundColor: COLORS.PRIMARY_WHITE,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...SHADOWS.LIGHT,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_DARK,
        marginLeft: 8,
    },
    leaderboardContainer: {
        gap: 12,
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.GRAY_LIGHT,
        borderRadius: 12,
    },
    firstPlace: {
        backgroundColor: COLORS.PRIMARY_RED,
    },
    rankContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rankText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_DARK,
    },
    firstPlaceText: {
        color: COLORS.PRIMARY_WHITE,
    },
    batchText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_DARK,
        flex: 1,
    },
    batchLogo: {
        width: 28,
        height: 28,
        borderRadius: 6,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)'
    },
    pointsText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.PRIMARY_RED,
    },
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.GRAY_LIGHT,
        borderRadius: 12,
        marginBottom: 12,
    },
    eventDateContainer: {
        width: 50,
        alignItems: 'center',
        marginRight: 16,
    },
    eventDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_RED,
    },
    eventMonth: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.GRAY_DARK,
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_DARK,
        marginBottom: 4,
    },
    eventTime: {
        fontSize: 14,
        color: COLORS.GRAY_DARK,
    },
    sponsorScroll: {
        marginTop: 8,
        marginBottom: 12,
    },
    sponsorCard: {
        backgroundColor: COLORS.GRAY_LIGHT,
        borderRadius: 12,
        padding: 16,
        marginRight: 12,
        width: 320,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sponsorLogo: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
});

export default DashboardScreen;
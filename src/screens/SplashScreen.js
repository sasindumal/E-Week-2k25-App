import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ModernText from '../components/ui/ModernText';
import { MODERN_COLORS, MODERN_GRADIENTS, MODERN_SHADOWS, MODERN_SPACING } from '../constants/modernTheme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const loadingOpacity = useRef(new Animated.Value(0)).current;
    const backgroundScale = useRef(new Animated.Value(1.2)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const orbAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animationSequence = Animated.sequence([
            // Background zoom in
            Animated.timing(backgroundScale, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            // Logo entrance with bounce
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            // Text fade in with stagger
            Animated.stagger(200, [
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(loadingOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        // Orb rotation animation
        const orbAnimation = Animated.loop(
            Animated.timing(orbAnim, {
                toValue: 1,
                duration: 8000,
                useNativeDriver: true,
            })
        );

        // Pulse animation for logo
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );

        // Start animations
        orbAnimation.start();
        animationSequence.start(() => {
            pulseAnimation.start();
            // Finish splash screen after 3.5 seconds
            setTimeout(() => {
                onFinish();
            }, 3500);
        });

        return () => {
            orbAnimation.stop();
            pulseAnimation.stop();
        };
    }, []);

    const orbRotation = orbAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {/* Animated Background */}
            <Animated.View 
                style={[
                    styles.backgroundContainer,
                    { transform: [{ scale: backgroundScale }] }
                ]}
            >
                <LinearGradient 
                    colors={MODERN_GRADIENTS.primary} 
                    style={styles.backgroundGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </Animated.View>

            {/* Floating Orbs */}
            <Animated.View 
                style={[
                    styles.orb1,
                    { transform: [{ rotate: orbRotation }] }
                ]}
            >
                <View style={styles.orbInner1} />
            </Animated.View>
            
            <Animated.View 
                style={[
                    styles.orb2,
                    { 
                        transform: [
                            { rotate: orbRotation },
                            { scale: pulseAnim }
                        ] 
                    }
                ]}
            >
                <View style={styles.orbInner2} />
            </Animated.View>

            {/* Content */}
            <View style={styles.content}>
                {/* Logo Section */}
                <Animated.View 
                    style={[
                        styles.logoContainer,
                        {
                            transform: [
                                { scale: Animated.multiply(logoScale, pulseAnim) }
                            ],
                            opacity: logoOpacity,
                        }
                    ]}
                >
                    {/* Glass morphism effect */}
                    <View style={styles.logoGlassContainer}>
                        <BlurView intensity={20} style={styles.logoBlur}>
                            <View style={styles.logoCircle}>
                                <Image 
                                    style={styles.logo} 
                                    source={require('../../assets/logo.png')} 
                                />
                            </View>
                        </BlurView>
                    </View>
                    
                    <View style={styles.logoBadge}>
                        <ModernText variant="caption" color="white" weight="bold">
                            E-WEEK 2K25
                        </ModernText>
                    </View>
                </Animated.View>

                {/* Title Section */}
                <Animated.View 
                    style={[styles.titleContainer, { opacity: textOpacity }]}
                >
                    <ModernText variant="display" color="white" weight="bold" align="center">
                        E WEEK 2K25
                    </ModernText>
                    <ModernText variant="title" color="accent" weight="semibold" align="center" style={styles.subtitle}>
                        ODYSSEY
                    </ModernText>
                    <ModernText variant="body" color="white" align="center" style={styles.tagline}>
                        A Journey of Innovation
                    </ModernText>
                    <ModernText variant="bodySmall" color="white" align="center" style={styles.organizer}>
                        E22 • Faculty of Engineering • University of Jaffna
                    </ModernText>
                </Animated.View>

                {/* Loading Section */}
                <Animated.View 
                    style={[
                        styles.loadingContainer,
                        { opacity: loadingOpacity }
                    ]}
                >
                    <View style={styles.loadingDots}>
                        <LoadingDot delay={0} />
                        <LoadingDot delay={200} />
                        <LoadingDot delay={400} />
                    </View>
                    <ModernText variant="bodySmall" color="white" align="center" style={styles.loadingText}>
                        Initializing Odyssey...
                    </ModernText>
                </Animated.View>
            </View>
        </View>
    );
};

const LoadingDot = ({ delay }) => {
    const dotScale = useRef(new Animated.Value(0.3)).current;
    const dotOpacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(dotScale, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dotOpacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(dotScale, {
                        toValue: 0.3,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dotOpacity, {
                        toValue: 0.3,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        setTimeout(() => {
            animation.start();
        }, delay);

        return () => animation.stop();
    }, [delay]);

    return (
        <Animated.View 
            style={[
                styles.loadingDot,
                {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity,
                }
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MODERN_COLORS.navy,
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundGradient: {
        flex: 1,
    },
    
    // Floating orbs
    orb1: {
        position: 'absolute',
        top: height * 0.1,
        right: width * 0.1,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    orbInner1: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    orb2: {
        position: 'absolute',
        bottom: height * 0.15,
        left: width * 0.15,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    orbInner2: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        backgroundColor: 'rgba(167, 28, 32, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(167, 28, 32, 0.4)',
    },
    
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: MODERN_SPACING.lg,
    },
    
    logoContainer: {
        alignItems: 'center',
        marginBottom: MODERN_SPACING['3xl'],
    },
    logoGlassContainer: {
        borderRadius: 80,
        overflow: 'hidden',
        ...MODERN_SHADOWS.xl,
    },
    logoBlur: {
        borderRadius: 80,
    },
    logoCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 0,
    },
    logoBadge: {
        marginTop: MODERN_SPACING.md,
        backgroundColor: 'rgba(255, 215, 0, 0.9)',
        paddingHorizontal: MODERN_SPACING.md,
        paddingVertical: MODERN_SPACING.sm,
        borderRadius: 20,
        ...MODERN_SHADOWS.md,
    },
    
    titleContainer: {
        alignItems: 'center',
        marginBottom: MODERN_SPACING['3xl'],
    },
    subtitle: {
        marginTop: MODERN_SPACING.sm,
        letterSpacing: 2,
    },
    tagline: {
        marginTop: MODERN_SPACING.md,
        opacity: 0.9,
        fontStyle: 'italic',
    },
    organizer: {
        marginTop: MODERN_SPACING.sm,
        opacity: 0.7,
    },
    
    loadingContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: MODERN_SPACING['3xl'],
    },
    loadingDots: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: MODERN_SPACING.md,
    },
    loadingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: MODERN_COLORS.accent,
        marginHorizontal: 4,
        ...MODERN_SHADOWS.sm,
    },
    loadingText: {
        opacity: 0.8,
        letterSpacing: 0.5,
    },
});

export default SplashScreen;

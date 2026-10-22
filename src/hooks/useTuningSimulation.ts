import { useState } from 'react';
import { Alert } from 'react-native';
import { useReputation } from '../context/ReputationContext';
import { useWeather } from '../hooks/useWeather';

export function useTuningSimulation(defaultHp: number) {
    const [hp, setHp] = useState(defaultHp);
    const { addReputation } = useReputation();
    const [upgrades, setUpgrades] = useState({
        ecu: false,
        turbo: false,
        exhaust: false,
        nos: false,
    });
    const [hasWagered, setHasWagered] = useState(false);
    const [wear, setWear] = useState(0);
    const [tires, setTires] = useState<'Street' | 'Slick'>('Street');
    const { isRaining, isFoggy } = useWeather();
    const [isImpounded, setIsImpounded] = useState(false);

    const handleUpgrade = (part: keyof typeof upgrades, hpBoost: number) => {
        if (!upgrades[part]) {
            setUpgrades((prev) => ({ ...prev, [part]: true }));
            setHp((prev) => prev + hpBoost);
            setWear((prev) => Math.min(prev + 10, 100)); // Increase wear on tuning
        }
    };

    const handleWager = () => {
        if (isImpounded) {
            Alert.alert(
                'Vehicle Impounded',
                'Your vehicle has been impounded by the police. Pay the bribe to release it.',
            );
            return;
        }

        if (wear >= 100) {
            Alert.alert(
                'Vehicle Damaged',
                'Your vehicle wear is at 100%. Repair it before racing.',
            );
            return;
        }

        if (hasWagered) {
            Alert.alert('Wager Closed', 'You have already raced this build.');
            return;
        }

        // Apply weather penalty
        let effectiveHp = hp;
        if (isRaining && tires === 'Slick') {
            effectiveHp -= 150; // Severe penalty for slicks in the rain
            Alert.alert(
                'WEATHER PENALTY',
                'Racing slicks in the rain caused a severe loss of traction (-150 HP equivalent)',
            );
        } else if (isFoggy && tires === 'Slick') {
            effectiveHp -= 75; // Moderate penalty for slicks in fog
            Alert.alert(
                'WEATHER PENALTY',
                'Racing slicks in the fog caused reduced traction (-75 HP equivalent)',
            );
        }

        const rivalHp = defaultHp + 100; // Mock rival with +100 HP base
        setHasWagered(true);
        setWear((prev) => Math.min(prev + (upgrades.nos ? 40 : 20), 100)); // Increase wear on racing

        if (effectiveHp > rivalHp) {
            addReputation(500); // Win
            Alert.alert(
                'PINK SLIP WON',
                'Your tuning paid off! You beat the rival and gained 500 REP.',
            );
        } else {
            addReputation(-200); // Lose

            if (Math.random() > 0.5) {
                setIsImpounded(true);
                Alert.alert(
                    'BUSTED & IMPOUNDED',
                    "Your build wasn't fast enough. The rival won, you lost 200 REP, and the police impounded your vehicle!",
                );
            } else {
                Alert.alert(
                    'BUSTED',
                    "Your build wasn't fast enough. The rival won, you lost 200 REP.",
                );
            }
        }
    };

    const handlePayBribe = () => {
        if (!isImpounded) return;
        addReputation(-300);
        setIsImpounded(false);
        setWear(0);
        Alert.alert('Bribe Paid', 'You paid 300 REP to release your vehicle from the impound lot.');
    };

    const handleRepair = () => {
        if (wear === 0) return;
        addReputation(-100);
        setWear(0);
        Alert.alert('Repaired', 'Vehicle fully repaired for 100 REP.');
    };

    const weatherPenalty = (isRaining || isFoggy) && tires === 'Slick';

    return {
        hp,
        upgrades,
        hasWagered,
        wear,
        tires,
        setTires,
        handleUpgrade,
        handleWager,
        handleRepair,
        weatherPenalty,
        isImpounded,
        handlePayBribe,
    };
}

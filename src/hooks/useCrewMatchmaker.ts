import { useState, useEffect } from 'react';
import { MOCK_CREWS, MOCK_PROFILE_USER } from '../data/mock';
import { useReputation } from '../context/ReputationContext';

export interface RecommendedCrew {
    id: string;
    name: string;
    matchScore: number;
    reason: string;
}

export function useCrewMatchmaker() {
    const { reputation } = useReputation();
    const [recommendations, setRecommendations] = useState<RecommendedCrew[]>([]);

    useEffect(() => {
        // Simple mock AI matchmaker logic
        // We match based on reputation compatibility and a random "playstyle" factor

        const scoredCrews = MOCK_CREWS.filter(crew => !MOCK_PROFILE_USER.crews.some(userCrew => userCrew.id === crew.id)).map(crew => {
            let matchScore = 50; // Base score
            let reason = 'Good general fit.';

            // Faction/Reputation check (mock logic: high heat crews prefer high rep users)
            if (crew.heatScore && crew.heatScore > 500) {
                if (reputation > 2000) {
                    matchScore += 40;
                    reason = 'They respect your high reputation in the underground.';
                } else {
                    matchScore -= 20;
                    reason = 'They usually look for more experienced drivers.';
                }
            } else {
                if (reputation < 1000) {
                    matchScore += 30;
                    reason = 'Great crew for upcoming drivers to grow.';
                } else {
                    matchScore += 10;
                    reason = 'Solid crew for relaxed cruising.';
                }
            }

            return {
                id: crew.id,
                name: crew.name,
                matchScore: Math.min(100, Math.max(0, matchScore)),
                reason
            };
        });

        // Sort by match score and take top 3
        const topMatches = scoredCrews
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 3);

        setRecommendations(topMatches);
    }, [reputation]);

    return { recommendations };
}

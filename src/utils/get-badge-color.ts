export const getBadgeColor = (badgeName: string): string => {
    switch (badgeName) {
        case 'Силовая':
            return 'var(--tranie-yellow)';
        case 'Ноги':
            return 'var(--character-light-error)';
        case 'Руки':
            return 'var(--tranie-cyan)';
        case 'Спина':
            return 'orange';
        case 'Грудь':
            return 'var(--character-light-success)';
        default:
            return 'var(--tranie-orange)';
    }
};

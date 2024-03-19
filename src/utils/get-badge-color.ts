const getBadgeColor = (badgeName: string): string => {
    switch (badgeName) {
        case 'Силовая':
            return 'green';
        case 'Ноги':
            return 'volcano';
        case 'Руки':
            return 'cyan';
        case 'Спина':
            return 'orange';
        case 'Грудь':
            return 'yellow';
        default:
            return 'blue';
    }
};

export default getBadgeColor;

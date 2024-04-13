export const getStringDayOfWeekByNumber = (number: number) => {
    const currNumber = number > 6 ? number % 7 : number;

    switch (currNumber) {
        case 0:
            return 'Понедельник';
        case 1:
            return 'Вторник';
        case 2:
            return 'Среда';
        case 3:
            return 'Четверг';
        case 4:
            return 'Пятница';
        case 5:
            return 'Суббота';
        case 6:
            return 'Воскресенье';
        default:
            throw Error('Invalid number day getStringDayOfWeekByNumber');
    }
};

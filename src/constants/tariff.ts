import { ProfileDataTestId } from './data-test-id';

export const cardTariffContent = [
    {
        title: 'FREE tariff',
        isPaid: false,
        srcImg: '/free.png',
    },
    {
        title: 'PRO tariff',
        isPaid: true,
        srcImg: '/pro_able.png',
        dataTestIdCard: ProfileDataTestId.PRO_TARIFF_CARD,
        dataTestIdButton: ProfileDataTestId.ACTIVATE_TARIFF_BTN,
    },
];

export const optionsProTariff = [
    {
        title: 'Cтатистика за месяц',
        available: true,
    },
    {
        title: 'Cтатистика за все время',
        available: false,
    },
    {
        title: 'Совместные тренировки',
        available: true,
    },
    {
        title: 'Участие в марафонах',
        available: false,
    },
    {
        title: 'Приложение iOS',
        available: false,
    },
    {
        title: 'Приложение Android',
        available: false,
    },
    {
        title: 'Индивидуальный Chat GPT',
        available: false,
    },
];

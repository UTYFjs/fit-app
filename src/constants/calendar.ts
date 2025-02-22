import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

import ruRU from 'antd/lib/calendar/locale/ru_RU';

export const localeCalendar: PickerLocale = {
    lang: {
        locale: 'ru_RU',
        placeholder: 'Выберите дату',
        rangePlaceholder: ['Start date', 'End date'],
        today: 'Today',
        now: 'Now',
        backToToday: 'Back to today',
        ok: 'OK',
        clear: 'Clear',
        month: 'Месяц',
        year: 'Год',
        timeSelect: 'Select time',
        dateSelect: 'Select date',
        monthSelect: 'Choose a month',
        yearSelect: 'Choose a year',
        decadeSelect: 'Choose a decade',
        yearFormat: 'YYYY',
        dateFormat: 'M/D/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'M/D/YYYY HH:mm:ss',
        monthFormat: 'MMMM',
        monthBeforeYear: true,
        previousMonth: 'Previous month (PageUp)',
        nextMonth: 'Next month (PageDown)',
        previousYear: 'Last year (Control + left)',
        nextYear: 'Next year (Control + right)',
        previousDecade: 'Last decade',
        nextDecade: 'Next decade',
        previousCentury: 'Last century',
        nextCentury: 'Next century',
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        placeholder: 'Select time',
    },
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM',
};

export const localeCalendar2: PickerLocale = {
    lang: {
        ...ruRU.lang,
        placeholder: 'Выберите дату',
        today: 'Сегодня',
        now: 'Сейчас',
        ok: 'OK',
        month: 'Месяц',
        year: 'Год',
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...ruRU.timePickerLocale,
    },
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM',
};

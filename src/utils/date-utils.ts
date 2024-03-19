import moment, { Moment } from 'moment';

export const isPast = (date: Moment) => moment(date).isBefore(moment());

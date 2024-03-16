import moment from 'moment';
import { Moment } from 'moment';

export const isPast = (date: Moment) =>   moment(date).isBefore(moment());

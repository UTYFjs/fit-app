import { Checkbox, DatePicker, Select } from 'antd';
import './drawer-periodicity.css';
import { localeCalendar2 } from '@constants/calendar';
import { DateFormat } from '@constants/date';
import { PeriodOptions } from '@constants/training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    getCurrentTraining,
    updateDateCurrentTraining,
    updatePeriodCurrentTraining,
} from '@redux/training-slice';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { TrainingDataTestId } from '@constants/data-test-id';
import { isPast } from '@utils/date-utils';
import { useGetTrainingsQuery } from '@services/training-api';
import { Nullable } from '../../../types/common-types';

export const DrawerPeriodicity = () => {
    const currentTraining = useAppSelector(getCurrentTraining);
    const { data: dataTrainings } = useGetTrainingsQuery();
    const dispatch = useAppDispatch();
    const [withPeriod, setWithPeriod] = useState(currentTraining.parameters?.repeat);

    useEffect(() => {
        if (currentTraining.date === '')
            dispatch(
                updateDateCurrentTraining(moment(new Date()).format(DateFormat.Server_Format)),
            );
    }, [currentTraining.date, dispatch]);

    const getDatePickerCellRender = (date: Moment) => {
        const key = date.format(DateFormat.DASH_YYYY_MM_DD);

        const style: React.CSSProperties = {};
        if (dataTrainings?.[key]?.length) {
            style.background = 'var(--primary-light-1)';
            style.width = '110%';
            style.color = 'var(--neutral-gray-12)';
        }
        return (
            <div className='ant-picker-cell-inner' style={style}>
                {date.date()}
            </div>
        );
    };
    const onChangeDate = (e: Nullable<moment.Moment>) => {
        if (e) {
            dispatch(updateDateCurrentTraining(e?.format(DateFormat.Server_Format)));
        } else {
            dispatch(updateDateCurrentTraining(''));
        }
    };
    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        if (!e.target.checked) {
            dispatch(updatePeriodCurrentTraining(null));
        }
        setWithPeriod(e.target.checked);
    };

    const onChangeSelect = (e: number) => {
        dispatch(updatePeriodCurrentTraining(e));
    };
    return (
        <div className='periodicity-wrapper'>
            <div className='periodicity-row'>
                <DatePicker
                    className='periodicity-item'
                    data-test-id={TrainingDataTestId.MODAL_DRAWER_RIGHT_DATE_PICKER}
                    disabledDate={(date) => isPast(date)}
                    dateRender={getDatePickerCellRender}
                    locale={localeCalendar2}
                    format={DateFormat.DOT_DD_MM_YYYY}
                    placeholder='Выберите дату'
                    size='small'
                    defaultValue={moment(currentTraining.date || new Date())}
                    onChange={onChangeDate}
                />
                <Checkbox
                    className='periodicity-item'
                    data-test-id={TrainingDataTestId.MODAL_DRAWER_RIGHT_CHECKBOX_PERIOD}
                    defaultChecked={currentTraining.parameters?.repeat}
                    onChange={onChangeCheckbox}
                >
                    С периодичностью
                </Checkbox>
            </div>
            {withPeriod && (
                <div className='periodicity-row'>
                    <Select
                        defaultValue={currentTraining.parameters?.period}
                        className='periodicity__select'
                        data-test-id={TrainingDataTestId.MODAL_DRAWER_RIGHT_SELECT_PERIOD}
                        placeholder={<div>Периодичность</div>}
                        size='small'
                        options={PeriodOptions}
                        onChange={onChangeSelect}
                    />
                </div>
            )}
        </div>
    );
};

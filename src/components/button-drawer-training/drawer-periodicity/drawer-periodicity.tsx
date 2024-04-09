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
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { TrainingDataTestId } from '@constants/data-test-id';

//type DrawerPeriodicityProps = {};

export const DrawerPeriodicity = () => {
    const currentTraining = useAppSelector(getCurrentTraining);
    const dispatch = useAppDispatch();
    const [withPeriod, setWithPeriod] = useState(false);

    useEffect(() => {
        if (currentTraining.date === '')
            dispatch(
                updateDateCurrentTraining(moment(new Date()).format(DateFormat.Server_Format)),
            );
    }, [currentTraining.date, dispatch]);

    const onChangeDate = (e: moment.Moment | null) => {
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
        //todo привязать чекбокс к repeat
    };

    const onChangeSelect = (e: number) => {
        dispatch(updatePeriodCurrentTraining(e));
    };
    return (
        <div className='periodicity-wrapper'>
            <div className='periodicity-row'>
                <DatePicker
                    data-test-id={TrainingDataTestId.MODAL_DRAWER_RIGHT_DATE_PICKER}
                    locale={localeCalendar2}
                    format={DateFormat.DOT_DD_MM_YYYY}
                    placeholder='Выберите дату'
                    size='small'
                    defaultValue={moment(currentTraining.date || new Date())}
                    onChange={onChangeDate}
                    // data-test-id={ProfileDataTestId.PROFILE_BIRTHDAY}
                />
                <Checkbox
                    data-test-id={TrainingDataTestId.MODAL_DRAWER_RIGHT_CHECKBOX_PERIOD}
                    onChange={onChangeCheckbox}
                >
                    С периодичностью
                </Checkbox>
            </div>
            {withPeriod && (
                <div className='periodicity-row'>
                    <Select
                        // className='training-list__select'
                        data-test-id={TrainingDataTestId.MODAL_DRAWER_RIGHT_SELECT_PERIOD}
                        // defaultValue={selectedTraining || 'Выбор типа тренировки'}
                        placeholder={<div>Периодичность</div>}
                        size={'middle'}
                        options={PeriodOptions}
                        onChange={onChangeSelect}
                    />
                </div>
            )}
        </div>
    );
};

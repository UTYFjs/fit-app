import { Checkbox, Input, InputNumber } from 'antd';
import './exercise-form.css';
import { CalendarDataTeatId } from '@constants/data-test-id';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    updateExerciseApproachesCurrentTraining,
    updateExerciseNameCurrentTraining,
    updateExerciseReplaysCurrentTraining,
    updateExerciseWeightCurrentTraining,
} from '@redux/training-slice';

type ExerciseFormProps = {
    approaches: number;
    weight: number;
    replays: number;
    name: string;
    index: number;
    forRemoveIdxExercises: number[];
    // handleOnChangeName: (name: string, index: number) => void;
    handleOnChangeRemoveCheckbox: (index: number) => void;
    // handleOnChangeReplays: (replays: number, index: number) => void;
    // handleOnChangeWeight: (weight: number, index: number) => void;
    // handleOnChangeApproaches: (approaches: number, index: number) => void;
    isEdit?: boolean;
};

export const ExerciseForm = ({
    approaches,
    weight,
    replays,
    name,
    index,
    forRemoveIdxExercises,
    handleOnChangeRemoveCheckbox,
    // handleOnChangeReplays,
    // handleOnChangeWeight,
    // handleOnChangeApproaches,
    isEdit = false,
}: ExerciseFormProps) => {
    const dispatch = useAppDispatch();
    //const currentTraining = useAppSelector(getCurrentTraining);

    const onChangeName = (value: string, index: number) => {
        dispatch(updateExerciseNameCurrentTraining({ value, index }));
        //console.log(currentTraining.exercises);
    };
    const onChangeApproaches = (value: number, index: number) => {
        dispatch(updateExerciseApproachesCurrentTraining({ value, index }));
    };
    const onChangeWeight = (value: number, index: number) => {
        dispatch(updateExerciseWeightCurrentTraining({ value, index }));
    };
    const onChangeReplays = (value: number, index: number) => {
        dispatch(updateExerciseReplaysCurrentTraining({ value, index }));
    };
    return (
        <fieldset key={index} className='exercise-item'>
            <Input
                name='name'
                className='exercise-item__input-title'
                data-test-id={`${CalendarDataTeatId.MODAL_DRAWER_RIGHT_INPUT_EXERCISE_INDEX}${index}`}
                placeholder='Упражнение'
                size='small'
                value={name}
                addonAfter={
                    isEdit ? (
                        <Checkbox
                            checked={forRemoveIdxExercises.includes(index)}
                            onChange={() => {
                                handleOnChangeRemoveCheckbox(index);
                            }}
                            data-test-id={`${CalendarDataTeatId.MODAL_DRAWER_RIGHT_CHECKBOX_EXERCISE_INDEX}${index}`}
                        />
                    ) : (
                        false
                    )
                }
                onChange={(e) => {
                    onChangeName(e.target.value, index);
                }}
            />
            <div className='exercise-item__values'>
                <div>
                    <div className='exercise-item__label'> Подходы </div>
                    <InputNumber
                        name='approaches'
                        //className='exercise-item__input-approaches'
                        data-test-id={`${CalendarDataTeatId.MODAL_DRAWER_RIGHT_INPUT_APPROACH_INDEX}${index}`}
                        addonBefore='+'
                        min={1}
                        placeholder='1'
                        size='small'
                        value={approaches}
                        onChange={(value) => {
                            onChangeApproaches(value || 1, index);
                        }}
                    />
                </div>
                <div className='exercise-item__values_second'>
                    <div>
                        <div className='exercise-item__label'> Вес, кг </div>
                        <InputNumber
                            name='weight'
                            //className='exercise-item__input-weight'
                            data-test-id={`${CalendarDataTeatId.MODAL_DRAWER_RIGHT_INPUT_WEIGHT_INDEX}${index}`}
                            min={0}
                            placeholder='0'
                            size='small'
                            value={weight}
                            onChange={(value) => {
                                onChangeWeight(value || 0, index);
                            }}
                        />
                    </div>
                    <div className='input-divider'> x </div>
                    <div>
                        <div className='exercise-item__label'> Количество </div>
                        <InputNumber
                            name='replays'
                            //className='exercise-item__input-count'
                            data-test-id={`${CalendarDataTeatId.MODAL_DRAWER_RIGHT_INPUT_QUANTITY_INDEX}${index}`}
                            min={1}
                            placeholder='3'
                            size='small'
                            value={replays}
                            onChange={(value) => {
                                onChangeReplays(value || 1, index);
                            }}
                        />
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

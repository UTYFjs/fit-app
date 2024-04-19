import './tags-list.css';
import { getTrainingTagNames } from '@utils/get-training-tag-names';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { TagTrainingsListType } from '@pages/achievment-page/achievment-page';
import { TrainingListType } from '../../types/training-types';

type TagsListProps = {
    checkedTag: TagTrainingsListType;
    handleOnChangeTag: (tagName: TagTrainingsListType) => void;
    dataTrainingList: TrainingListType[];
};

export const TagsList = ({ checkedTag, handleOnChangeTag, dataTrainingList }: TagsListProps) => (
    <div className='tags-container'>
        <div className='tags-list__title'>Тип тренировки:</div>{' '}
        <div className='tags-list'>
            {getTrainingTagNames(dataTrainingList).map((item) => (
                <CheckableTag
                    className='tag_training-filter'
                    key={item}
                    checked={item === checkedTag}
                    onChange={(checked) => {
                        if (checked) {
                            handleOnChangeTag(item as TagTrainingsListType);
                        }
                    }}
                >
                    {item}{' '}
                </CheckableTag>
            ))}
        </div>
    </div>
);

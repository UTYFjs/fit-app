import { UserJointTrainingListType } from '../types/training-types';

const statusValueForSort = {
    accepted: 0,
    pending: 1,
    null: 2,
    rejected: 3,
};

export const sortByAZAndStatusUsers = (data: UserJointTrainingListType[]) => {
    return [...data].sort((a, b) => {
        if (a.status !== b.status) {
            return (
                statusValueForSort[a.status as keyof typeof statusValueForSort] -
                statusValueForSort[b.status as keyof typeof statusValueForSort]
            );
        } else {
            return a.name.localeCompare(b.name);
        }
    });
};

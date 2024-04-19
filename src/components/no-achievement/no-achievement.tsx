import NoFoundImg from '@assets/no-found.svg';
import { Period, PeriodValues } from '@pages/achievment-page/achievment-page';
import './no-achievement.css';

type NoAchievementProps = {
    period: Period;
};
export const NoAchievementStats = ({ period }: NoAchievementProps) => {
    return (
        <div className='no-achievements'>
            <img src={NoFoundImg} alt='no found' className='no-achievements__img' />
            <p className='no-achievements__title'>
                {`Ой, такой тренировки ${
                    period === PeriodValues.perWeek ? 'на этой неделе' : 'в этом месяце'
                } не было.`}
            </p>
        </div>
    );
};

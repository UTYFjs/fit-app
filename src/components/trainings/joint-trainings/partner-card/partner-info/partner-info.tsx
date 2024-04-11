import './partner-info.css';

type PartnerInfoProps = {
    trainingType: string;
    avgWeightInWeek: number;
};

export const PartnerInfo = ({ trainingType, avgWeightInWeek }: PartnerInfoProps) => (
    <div className='partner-card__info'>
        <p className='partner-card__info-title'>Тип тренировки:</p>
        <p className='partner-card__info-value'>{trainingType}</p>
        <p className='partner-card__info-title'>Средняя нагрузка:</p>
        <p className='partner-card__info-value'>{avgWeightInWeek} кг/нед</p>
    </div>
);

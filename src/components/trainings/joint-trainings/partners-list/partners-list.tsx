import './partners-list.css';

export const PartnersList = () => {
    return (
        <div className='partners-list-wrapper'>
            <h4 className='partners-list__title'>Мои партнёры по тренировкам</h4>
            <p className='partners-list__empty-subtitle'>
                У вас пока нет партнёров для совместных тренировок
            </p>
        </div>
    );
};

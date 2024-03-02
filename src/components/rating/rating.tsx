import { Rate } from 'antd';
import  './rating.css';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { getCssVar } from '@utils/get-css-var';
import { IRatingStar } from '../../types/api';


type IFeedbackProps = {
    rating: number;
    isDisable?: boolean;
    fontSize?: number
    onChange?: (value: IRatingStar) => void
    
};

const Rating = ({ rating, isDisable = false, fontSize = 14, onChange}: IFeedbackProps) => {

  const colorIcon = getCssVar('--character-light-warning');
    return (
        <Rate
            //className={'feedback__rating'}
            disabled={isDisable}
            //allowClear={false}
            character={({ index, value, allowHalf }) => {
               if (index !== undefined && value !== undefined) {
                    return value > index ? (
                        <StarFilled
                            size={45}
                            style={{ color: colorIcon, fontSize: fontSize }}
                        />
                    ) : (
                        <StarOutlined
                            style={{ color: colorIcon, fontSize: fontSize  }}
                        />
                    );
                }
            }}
            defaultValue={rating}
            onChange={(value) => {
                if ([0, 1, 2, 3, 4, 5].includes(value) && onChange) {
                    onChange(value as IRatingStar);
                }
            }}
            style={{ height: fontSize, lineHeight: `${fontSize}px` }}
        />
    );
};

export default Rating;

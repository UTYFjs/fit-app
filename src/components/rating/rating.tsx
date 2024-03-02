import { Rate } from 'antd';
import  './rating.css';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { getCssVar } from '@utils/get-css-var';


type IFeedbackProps = {
    rating: number;
    isDisable?: boolean;
    fontSize?: number
    
};

const Rating = ({ rating, isDisable = false, fontSize = 14 }: IFeedbackProps) => {

  const colorIcon = getCssVar('--character-light-warning');
    return (
        <Rate
            className={'feedback__rating'}
            disabled={isDisable}
            allowClear={false}
            character={({ index, value, allowHalf }) => {
                console.log('rating', index, value, allowHalf);
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
            style={{ height: fontSize, lineHeight: `${fontSize}px` }}
        />
    );
};

export default Rating;

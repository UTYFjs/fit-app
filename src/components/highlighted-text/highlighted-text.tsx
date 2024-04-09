type HighlightedTextProps = {
    text: string;
    searchValue: string;
};
export const HighlightedText = ({ text = '', searchValue }: HighlightedTextProps) => {
    if (!searchValue) {
        return <p className='partner-card__name'>{text}</p>;
    }

    const lowerCaseText = text.toLowerCase();
    const lowerCaseSearchValue = searchValue.toLowerCase().trim();
    const startIndex = lowerCaseText.indexOf(lowerCaseSearchValue);

    if (startIndex === -1) {
        return <p className='partner-card__name'>{text}</p>;
    }

    const endIndex = startIndex + searchValue.trim().length;

    return (
        <p className='partner-card__name'>
            {text.slice(0, startIndex)}
            <span style={{ color: 'red' }}>{text.slice(startIndex, endIndex)}</span>
            {text.slice(endIndex)}
        </p>
    );
};

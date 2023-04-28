import "./OptionComponent.css"

const OptionComponent = ({
    option,
    icon,
    backgroundColor,
    onClick,
    iconOption,
    imageSrc
}) => {
    return (
        <div className="options-component" style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            <img
                src={imageSrc}
                alt={option}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }}
            />
            <div className="options-component__text-icon">
                <div className="options-component__text">{option}</div>
                <div className="options-component__detail-container">
                    <div className="options-component__text-icon-container">
                        {icon}
                        <span>{iconOption}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptionComponent; 
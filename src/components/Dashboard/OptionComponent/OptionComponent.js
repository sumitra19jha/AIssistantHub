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
            <div className="options-component-text-icon">
                <div className="options-component-text">{option}</div>
                <div className="options-component-parent">
                    <div className="options-component-child">
                        {icon}
                        <span>{iconOption}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptionComponent; 
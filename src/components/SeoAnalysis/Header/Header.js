import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, onExport }) => {
    const navigate = useNavigate();
    const [isExportLoading, setExportIsLoading] = useState(false);

    const handleArrowBackClick = () => {
        navigate(-1);
    };

    const exportContent = async (event) => {
        try {
            setExportIsLoading(true);
            await onExport();
        } catch (error) {
            console.error("Some issue occurred!", error);
        } finally {
            setExportIsLoading(false);
        }
    };

    return (
        <div className="content-editor-header">
            <div className="arrow-back-container" onClick={handleArrowBackClick}>
                <IoIosArrowBack className="arrow-back-icon" />
            </div>

            {/* Title */}
            <h2 className="header-title" title={title}>{title}</h2>

            <button className="header-button header-button-create-new" onClick={exportContent}>{isExportLoading ? <div className="loading-spinner" /> : "Export"}</button>
 </div>
    );
};

export default Header;
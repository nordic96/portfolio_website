import React from 'react';
import * as MUIcon from '@mui/icons-material';

interface IconProps {
    icon?: keyof typeof MUIcon;
}

const IconComp: React.FC<IconProps> = ({ icon }) => {
    const Icon = icon && MUIcon[icon];
    if (Icon) {
        return <Icon />;
    }
    return null;
};

export default IconComp;

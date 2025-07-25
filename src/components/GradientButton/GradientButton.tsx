import React from 'react';

interface ButtonProps extends React.PropsWithChildren {
    buttonClass?: string;
    labelClass?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DEFAULT_BTN_CLASS =
    'rounded-sm px-4 py-2 bg-linear-to-r from-coolblue to-coolred hover:to-blue-600 shadow-lg';
const DEFAULT_LABEL_CLASS =
    'text-white uppercase font-semibold text-lg max-sm:text-base';

const GradientButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { buttonClass, labelClass, onClick } = props;
    const btnClass = DEFAULT_BTN_CLASS.concat(` ${buttonClass}`);
    const lblClass = DEFAULT_LABEL_CLASS.concat(` ${labelClass}`);

    return (
        <button className={btnClass} onClick={onClick}>
            <label className={lblClass}>{props.children}</label>
        </button>
    );
};

export default GradientButton;

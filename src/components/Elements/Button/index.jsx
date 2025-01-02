import React from 'react';

const Button = (props) => {
    const { 
        children, 
        variant = "bg-blue-400", 
        onClick = () => {}, 
        type = "button",
        disabled = false 
    } = props;

    return (
        <button
            className={`${variant} px-6 py-3 border-4 border-black font-black uppercase
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                ${disabled ? 'opacity-50 cursor-not-allowed' : 
                    'hover:-translate-y-1 transform transition-transform'}
                text-black focus:outline-none`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
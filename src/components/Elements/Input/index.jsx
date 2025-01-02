import { forwardRef } from 'react';

const InputForm = forwardRef((props, ref) => {
    const { label, name, type, placeholder, value, onChange } = props;

    return (
        <div className="mb-6">
            <label
                htmlFor={name}
                className="block mb-2 text-black font-bold uppercase"
            >
                {label}
            </label>
            <input
                ref={ref}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 border-4 border-black bg-white 
                    text-black placeholder-gray-500 focus:outline-none
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    transition-all duration-200"
            />
        </div>
    );
});

export default InputForm;
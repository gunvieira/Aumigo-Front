import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const MyInput: React.FC<InputProps> = ({
                                         id,
                                         label,
                                         type = 'text',
                                         placeholder,
                                         className = '',
                                         labelClassName = '',
                                         inputClassName = '',
                                         ...props
                                     }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium mb-1 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none ${inputClassName}`}
                {...props}
            />
        </div>
    );
};

export default MyInput;



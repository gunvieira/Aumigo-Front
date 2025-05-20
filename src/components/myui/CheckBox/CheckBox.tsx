import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    className?: string;
    labelClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
                                               id,
                                               label,
                                               className = '',
                                               labelClassName = '',
                                               ...props
                                           }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                id={id}
                className="mr-2 accent-emerald-500"
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className={`text-sm ${labelClassName}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
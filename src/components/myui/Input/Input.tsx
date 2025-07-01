import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    validationType?: 'letters' | 'numbers';
    applyCpfMask?: boolean;
    error?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const MyInput: React.FC<InputProps> = ({
                                           id,
                                           label,
                                           validationType,
                                           applyCpfMask,
                                           error,
                                           className = '',
                                           labelClassName = '',
                                           inputClassName = '',
                                           onChange,
                                           ...props
                                       }) => {
    const handleCpfMask = (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value, name} = e.target; // Get name from the original event target

        if (validationType === 'letters') {
            value = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (validationType === 'numbers' || applyCpfMask) {
            value = value.replace(/\D/g, '');
        }

        if (applyCpfMask) {
            value = handleCpfMask(value);
        }

        // Create a new event-like object that has the properties the parent handler needs.
        // The parent's `handleChange` expects an object with a `target` property,
        // which in turn has `name` and `value` properties.
        const newEvent = {
            target: {
                name: name, // Pass the original name
                value: value  // Pass the (potentially modified) value
            }
        };

        if (onChange) {
            // We cast the new object to the type expected by the parent's onChange prop
            // to avoid TypeScript compilation errors. This is safe because the parent
            // only uses `e.target.name` and `e.target.value`.
            onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const errorBorderClass = error ? 'border-red-500' : 'border-gray-300';

    return (
        <div className={`mb-4 ${className}`}> {/* Aumentada a margem inferior para o erro */}
            {label && (
                <label htmlFor={id} className={`block text-sm font-medium mb-1 text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errorBorderClass} ${inputClassName}`}
                onChange={handleChange}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
export default MyInput;

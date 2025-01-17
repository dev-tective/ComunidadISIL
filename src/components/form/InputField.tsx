import {useErrorField} from "../hooks/useErrorField.ts";

export interface InputFieldProps {
    label?: string;
    placeholder?: string;
    name: string;
    type?: string;
    value: string;
    onChange: () => void
    errorConditions?: (value: string, error: (errorValue: string | null) => void) => void;
}

const InputField = (
    { placeholder, name = '', type = 'text',  value, onChange, errorConditions, label }: InputFieldProps
) => {

    const { ref, error, handleBlur } = useErrorField<HTMLInputElement>({
        value, errorConditions
    })

    return (
        <>
            {error && (
                <p style={{color: 'red'}}>{error}</p>
            )}

            {label && (
                <label htmlFor={name}>{label}</label>
            )}

            <input placeholder={placeholder}
                   name={name}
                   ref={ref}
                   type={type}
                   value={value}
                   onBlur={handleBlur}
                   onChange={onChange}
            />
        </>
    )
}

export default InputField;
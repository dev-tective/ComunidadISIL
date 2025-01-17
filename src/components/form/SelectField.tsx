import ApiData from "../../models/ApiData.ts";

interface SelectFieldProps {
    label?: string;
    title: string;
    name: string;
    value: string;
    onChange: () => void
    options: ApiData[];
}

const SelectField = (
    { label, name, title, options = [] , value, onChange } : SelectFieldProps
) => {
    return (
        <>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
            <select name={name}
                    value={value}
                    onChange={onChange}
            >
                <option value={''}
                >{title}</option>
                {options && options.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </>
    )
};

export default SelectField;
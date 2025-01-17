import InputField, {InputFieldProps} from "./InputField.tsx";

interface FormFieldProps {
    fields: InputFieldProps[]
}

const FormFields = (
    { fields }: FormFieldProps,
) => {
    return (
        <>
            {fields.map((field, index) => (
                <InputField key={index}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={field.onChange}
                            errorConditions={field.errorConditions}
                />
            ))}
        </>
    )
}

export default FormFields;
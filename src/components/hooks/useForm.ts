import {useState} from "react";

interface UseFormResult {
    form: any;
    onInputChange: () => void;
    resetForm: () => void;
}

function useForm(fieldsForm: any): UseFormResult {
    const [form, setForm] = useState(fieldsForm)

    const onInputChange = (
        { target } : { target: { value: string, name: string } }
    ) => {
        setForm({
            ...form,
            [target.name]: target.value,
        })
    }

    const resetForm = () => {
        setForm(fieldsForm)
    }

    return {
        ...form,
        form,
        onInputChange,
        resetForm,
    }
}

export default useForm;
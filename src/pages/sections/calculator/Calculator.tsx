import './Calculator.css'
import useForm from "../../../components/hooks/useForm.ts";
import {handleErrorMajorMinor} from "../../../components/form/utils/errorConditions.ts";
import FormFields from "../../../components/form/FormFields.tsx";
import {InputFieldProps} from "../../../components/form/InputField.tsx";
import useCalculator from "./useCalculator.ts";
import ModalMessage from "../../../components/modales/ModalMessage.tsx";

const Calculator = () => {
    const { form, onInputChange, resetForm } = useForm({
        ep1: '0',
        ep2: '0',
        ep3: '0',
        ep4: '0',
        eParcial: '0',
        eFinal: '0',
    })
    const { ep1, ep2, ep3, ep4, eParcial, eFinal } = form
    const fieldsForm: InputFieldProps[] = [
        {
            name: 'ep1',
            label: 'Evaluación Permanente 1',
            type: 'number',
            value: ep1,
            onChange: onInputChange,
            errorConditions: handleErrorMajorMinor,
        },
        {
            name: 'ep2',
            label: 'Evaluación Permanente 2',
            type: 'number',
            value: ep2,
            onChange: onInputChange,
            errorConditions: handleErrorMajorMinor,
        },{
            name: 'ep3',
            label: 'Evaluación Permanente 3',
            type: 'number',
            value: ep3,
            onChange: onInputChange,
            errorConditions: handleErrorMajorMinor,
        },
        {
            name: 'ep4',
            label: 'Evaluación Permanente 4',
            type: 'number',
            value: ep4,
            onChange: onInputChange,
            errorConditions: handleErrorMajorMinor,
        },
        {
            name: 'eParcial',
            label: 'Evaluación Parcial',
            type: 'number',
            value: eParcial,
            onChange: onInputChange,
            errorConditions: handleErrorMajorMinor,
        },
        {
            name: 'eFinal',
            label: 'Evaluación Final',
            type: 'number',
            value: eFinal,
            onChange: onInputChange,
            errorConditions: handleErrorMajorMinor,
        },
    ]
    const { modalState, modalInfo, hideModal, handleCalculate } = useCalculator();

    return (
        <>
            {modalState && (
                <ModalMessage onClose={hideModal}
                              title={modalInfo.title}
                              message={modalInfo.message}
                              type={modalInfo.type}
                />
            )}
            <section className="grade-calculator">
                <h1>Calculador de Notas</h1>
                <div className={'calculator'}>
                    <FormFields fields={fieldsForm}/>
                </div>
                <section>
                    <button className="primaryButton"
                            onClick={resetForm}
                    >Limpiar
                    </button>
                    <button className="secondaryButton"
                            onClick={() => handleCalculate(ep1, ep2, ep3, ep4, eParcial, eFinal)}
                    >Calcular
                    </button>
                </section>
            </section>
        </>
    )
}

export default Calculator;
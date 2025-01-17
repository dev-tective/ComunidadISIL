import {MessageTitle, MessageType} from "../../../components/modales/models/Message.ts";
import {useModal} from "../../../components/modales/hooks/useModal.ts";

function useCalculator() {
    const { modalInfo, showModal, modalState, hideModal } = useModal();

    const convert = (value: string) => {
        if (value === '') {
            value = '0';
        }
        return parseFloat(value);
    }

    const handleCalculate = (
        ep1: string, ep2: string, ep3: string, ep4: string, eParcial: string, eFinal: string
    ) => {
        const EP1 = convert(ep1);
        const EP2 = convert(ep2);
        const EP3 = convert(ep3);
        const EP4 = convert(ep4);
        const EParcial = convert(eParcial);
        const EFinal = convert(eFinal);

        const notes = [EP1, EP2, EP3, EP4, EParcial, EFinal];
        for (const note of notes) {
            if (note > 20 || note < 0) {
                showModal({
                    type: MessageType.ERROR,
                    title: MessageTitle.ERROR,
                    message: 'Las notas ingresadas no siguen los parámetros marcados.'
                });
                return;
            }
        }

        const averageEPS = (EP1 + EP2 + EP3 + EP4) / 4;
        const result = averageEPS * 0.4 + EParcial * 0.3 + EFinal * 0.3;
        let message: string;

        if (result > 16) {
            message = "Excelente resultado, siéntete orgulloso: ";
        } else if (result > 13) {
            message = "Tuviste una nota decente, así que celébralo: ";
        } else if (result > 12.5) {
            message = "Aprobaste por un pelo, te salvaste esta vez: ";
        } else {
            message = "Inténtalo el próximo ciclo, hijito: ";
        }

        message += result.toFixed(2)
        showModal({
            type: MessageType.SUCCESS,
            title: 'Nota Final',
            message
        })
    }

    return {
        modalState,
        modalInfo,
        hideModal,
        handleCalculate,
    }
}

export default useCalculator;
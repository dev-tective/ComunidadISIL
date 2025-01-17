export function handleErrorEmpty(
    value: string,
    error: (errorValue: string | null) => void
) {
    if (!value) {
        error('El campo no puede estar vacío.');
        return;
    }
    error(null);
}

export function handleErrorMail(
    value: string,
    error: (errorValue: string | null) => void
) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        error("El formato del correo electrónico es incorrecto.");
        return;
    }
    error(null);
}

export function  handleErrorMajorMinor(
    value: string,
    error: (errorValue: string | null) => void
) {
    if (parseFloat(value) > 20) {
        error(`La nota no puede ser mayor a 20.`)
        return;
    }
    if (parseFloat(value) < 0){
        error(`La nota no puede ser menor a 0.`)
        return;
    }
    error(null);
}
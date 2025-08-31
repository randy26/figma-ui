export class DateUtils {
    /**
     * Formatea una fecha en formato dd/mm/yyyy
     * @param dateInput - Fecha en string o Date
     * @returns Fecha formateada o '-' si es inválida o nula
     */
    static formatDate(dateInput) {
        if (!dateInput)
            return '-';
        const date = new Date(dateInput);
        if (isNaN(date.getTime()))
            return '-';
        return date.toLocaleDateString('es-AR'); // formato dd/mm/yyyy
    }
}

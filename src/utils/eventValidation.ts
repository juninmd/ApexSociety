export interface EventFormFields {
    title: string;
    date: string;
    time: string;
    location: string;
}

const DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

// Confere se DD/MM/AAAA existe no calendario (ex.: 31/02 nao existe).
function isValidDate(value: string): boolean {
    const match = DATE_RE.exec(value);
    if (!match) return false;
    const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])];
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function validateEventForm(fields: EventFormFields): string | null {
    const { title, date, time, location } = fields;
    if (!title.trim() || !date.trim() || !time.trim() || !location.trim()) {
        return 'Por favor, preencha todos os campos obrigatórios';
    }
    if (!isValidDate(date.trim())) return 'Data inválida. Use o formato DD/MM/AAAA.';
    if (!TIME_RE.test(time.trim())) return 'Hora inválida. Use o formato HH:MM (00:00 a 23:59).';
    return null;
}

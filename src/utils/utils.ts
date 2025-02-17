export function formateData(isoString: string): string {
    const date = new Date(isoString)
    const formatter = Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}
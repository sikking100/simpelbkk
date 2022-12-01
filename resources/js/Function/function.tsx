import moment from "moment"

export default function rupiah(value: number) {
    return Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0
    }).format(value)
}

export function dateToMysql(date: Date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function dateToShow(date: number) {
    return Intl.DateTimeFormat('id-ID', {
        day: "2-digit",
        month: "long",
        year: 'numeric'
    }).format(date)
}
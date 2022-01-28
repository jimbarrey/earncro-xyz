
export default function formatMoney(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: value > 10 ? 0 : 2,
    });

    return formatter.format(value);
}
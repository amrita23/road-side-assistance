export const decimalNumber = item => {
    const re = /^[0-9\b]+$/;
    return re.test(item.value)
}
export const checkMaturity = (maturity: Date):boolean => {
    if (maturity < new Date())
        return false

    return true;
}
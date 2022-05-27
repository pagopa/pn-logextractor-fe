
export const regex = {
    ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN: /^[\\w(?:Ã ,Ã²,Ã¨,Ã©)]+$/,
    FISCAL_CODE_PATTERN: /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$/, 
    UNIQUE_IDENTIFIER_PATTERN: /^[A-Za-z0-9\~\-\_]*$/
}

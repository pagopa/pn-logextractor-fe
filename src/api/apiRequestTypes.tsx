/**
 * @typedef {Object} getPersonBasicDataType
 */
type getPersonBasicDataType = {
    recipientType: string;
    ticketNumber?: string | undefined;
    taxId?: string | undefined;
    personId?: string | undefined;
}

/**
 * @typedef {Object} getPersonsLogsType
 */
type getPersonsLogsType = {
    ticketNumber: string;
    deanonimization: boolean;
    taxId?: string;
    referenceDate?: string;
    personId?: string;
    iun?: number;
    dateFrom?: string;
    dateTo?: string;
    password: string
}

/**
 * @typedef {Object} getOperatorsLogsType
 */
type getOperatorsLogsType = {
    ticketNumber: string;
    taxId: string;
    dateFrom: string;
    dateTo: string;
    password: string;
}

/**
 * @typedef {Object} getNotificationsInfoLogsType
 */
type getNotificationsInfoLogsType = {
    ticketNumber: string;
    iun: number;
    password: string;
}

/**
 * @typedef {Object} getNotificationsMonthlyStatsLogsType
 */
type getNotificationsMonthlyStatsLogsType = {
    ticketNumber: string;
    ipaCode: number;
    referenceMonth: string;
    password: string;
}

/**
 * @typedef {Object} getNotificationsMonthlyStatsLogsType
 */
type getLogsProcessesType = {
    traceId: string;
    dateFrom: string;
    dateTo: string;
    password: string;
}

export type { getPersonBasicDataType, getPersonsLogsType, getOperatorsLogsType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getLogsProcessesType }
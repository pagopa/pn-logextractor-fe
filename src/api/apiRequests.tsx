// import { apiClient } from "./apiClient";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, 
    getOperatorsLogsType, getPersonBasicDataType, getPersonsLogsType } from "./apiRequestTypes";
import { http as apiClient } from "./axiosClient"
import { base64StringToBlob } from "blob-util";

/**
 * Return the person's fiscal code or ID depending on the input received
 * @param {getPersonBasicDataType} data 
 */
const getPersonBasicData = async (payload: getPersonBasicDataType)  => {
    return await apiClient.getPersonBasicData(payload)
        .then((result) => {
            return result
        })
        .catch((error: any) => {
            throw error;
        })  
}
/**
 * Download the logs' archive related to a person's own activities or on a notification
 * @param {getPersonsLogsType} data 
 */
const getPersonsLogs = async (data: getPersonsLogsType) => {
    return await apiClient.getPersonsLogs(data)
            .then((result: any) => { 
            var file = base64StringToBlob(result.data, "application/zip");
            var fileURL = URL.createObjectURL(file);
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.download = "Response";
            fileLink.click();
            return result;
               
        })
        .catch((error: any) => {
            throw error;
        }) 
}

/**
 * Download the logs' archive related to a person activities and its operators' ones
 * @param {getOperatorsLogsType} data 
 */
const getOperatorsLogs = async (data: getOperatorsLogsType) => {
    return await apiClient.getOperatorsLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })  
}

/**
 * Download the logs' archive containing the full info of a notification
 * @param {getNotificationsInfoLogsType} data 
 */
const getNotificationsInfoLogs = async (data: getNotificationsInfoLogsType) => {
    return await apiClient.getNotificationsInfoLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })  
}

/**
 * Download the logs' archive containing the notifications sent in a specific month
 * @param {getNotificationsMonthlyStatsLogsType} data 
 */
const getNotificationsMonthlyStatsLogs = async (data: getNotificationsMonthlyStatsLogsType) => {
    return await apiClient.getNotificationsMonthlyStatsLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

/**
 * Get an automatically generated password from the server
 */
const getLogsPasswords = async () => {
    return await apiClient.getLogsPasswords()
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

/**
 * Extract all log paths by given a specific traceId
 */
const getLogsProcesses = async (data: getLogsProcessesType) => {
   return await apiClient.getLogsProcesses(data)
    .then((result: any) => {
        return result;
    })
    .catch((error: any) => {
        throw error;
    }) 
}

export default { getPersonBasicData, getPersonsLogs, getOperatorsLogs, getLogsPasswords,
    getNotificationsInfoLogs, getNotificationsMonthlyStatsLogs, getLogsProcesses }

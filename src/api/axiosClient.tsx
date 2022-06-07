import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getOperatorsLogsType, getPersonBasicDataType, getPersonsLogsType } from "./apiRequestTypes";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: "http://localhost:8080/logextractor/v1",
      headers,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        throw error;
      }
    );

    this.instance = http;
    return http;
  }

  getPersonBasicData<T = any, R = AxiosResponse<T>>(payload: getPersonBasicDataType): Promise<R> {
    return this.http.get<T, R>("/persons/basicData", { params: payload })
  }

  getPersonsLogs<T = any, R = AxiosResponse<T>>(payload: getPersonsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/persons", payload)
  }

  getOperatorsLogs<T = any, R = AxiosResponse<T>>(payload: getOperatorsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/operators", payload )
  }

  getNotificationsInfoLogs<T = any, R = AxiosResponse<T>>(payload: getNotificationsInfoLogsType): Promise<R> {
    return this.http.post<T, R>("logs/notifications/info", payload)
  }

  getNotificationsMonthlyStatsLogs<T = any, R = AxiosResponse<T>>(payload: getNotificationsMonthlyStatsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/notifications/monthly", payload)
  }

  getLogsPasswords<T = any, R = AxiosResponse<T>>(): Promise<R> {
    return this.http.get<T, R>("logs/passwords")
  }

  getLogsProcesses<T = any, R = AxiosResponse<T>>(payload: getLogsProcessesType): Promise<R> {
    return this.http.post<T, R>("logs/processes", payload)
  }

}

export const http = new Http();
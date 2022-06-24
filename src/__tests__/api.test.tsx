/**
 * @jest-environment node
 */

import React from "react";
import 'regenerator-runtime/runtime'
import apiRequests from "../api/apiRequests";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getOperatorsLogsType, getPersonIdType, getPersonsLogsType, getPersonTaxIdType } from "../api/apiRequestTypes";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.sessionStorage = sessionStorageMock as unknown as Storage;

describe('Api requests tests', () => {


    it('getPersonId', async() => {
        const payload: getPersonIdType = {
            recipientType: "PG",
            ticketNumber: "abc",
            taxId: "MLLSNT82P65Z404U"
        }
        const request = apiRequests.getPersonId(payload)
        const {data} = await request;
        console.log(data)
        expect(data).toMatchObject({"data": expect.any(String)})
    });

    it('getPersonTaxId', async() => {
        const payload: getPersonTaxIdType = {
            personId: "abc"
        }
        const request = apiRequests.getPersonTaxId(payload)
        const {data} = await request;
        expect(data).toMatchObject({"data": expect.any(String)})
    });

    it('getNotificationsInfoLogs', async() => {
        const payload:getNotificationsInfoLogsType = {
            ticketNumber: "abc",
            iun: 5
        }
        const request = apiRequests.getNotificationsInfoLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getNotificationsMonthlyStatsLogs', async() => {
        const payload:getNotificationsMonthlyStatsLogsType = {
            ticketNumber: "abc",
            ipaCode: 0,
            referenceMonth: "2022-05"
        }
        const request = apiRequests.getNotificationsMonthlyStatsLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getLogsProcesses', async() => {
        const payload:getLogsProcessesType = {
            traceId: "Root=1-628cd739-3a11653723d704c80fa4060e",
            dateFrom: "2022-03-25",
            dateTo: "2022-06-23"
        }
        const request = apiRequests.getLogsProcesses(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getPersonsLogs', async() => {
        const payload:getPersonsLogsType = {
            ticketNumber: "abc",
            deanonimization: false,
            iun: 45
        }
        const request = apiRequests.getPersonsLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getOperatorsLogs', async() => {
        const payload:getOperatorsLogsType = {
            ticketNumber: "abc",
            taxId: "MLLSNT82P65Z404U",
            dateFrom: "2022-04-25",
            dateTo: "2022-06-15"
        }
        const request = apiRequests.getOperatorsLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });
});
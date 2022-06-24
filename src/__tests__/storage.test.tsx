/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import { deleteStorage, getStorage, resetStorage, setStorage } from "../Authentication/storage";


describe('Storage', () => {
    it('setStorage', async() => {
        await setStorage("token", "test")
            .then(res => {
                expect(sessionStorage.getItem("token")).toEqual("test")
            })
            .catch((error: Error) => {
                expect(error).toBeTruthy()
            })
    });

    it('deleteStorage', async() => {
        setStorage("token", "test")
        await deleteStorage("token")
            .then(res => {
                expect(sessionStorage.getItem("token")).toEqual(null)
            })
            .catch((error: Error) => {
                expect(error).toBeTruthy();
            })
    });

    it('resetStorage', async() => {
        setStorage("token", "test")
        await resetStorage()
            .then(res => {
                expect(sessionStorage.length).toEqual(0)
            })
            .catch((error: Error) => {
                expect(error).toBeTruthy();
            })
    });

    it('getStorage', async() => {
        setStorage("token", "test")
        await getStorage("token")
            .then(res => {
                expect(res).toEqual("test")
            })
            .catch((error: Error) => {
                expect(error).toBeTruthy();
            })
    });

})
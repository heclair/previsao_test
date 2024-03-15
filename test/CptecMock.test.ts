import { NextFunction, Request, Response } from "express";
import request from "supertest";
import PrevisaoController from "../src/controllers/PrevisaoController";
import Cptec from "../src/services/Cptec";
import { parseString } from 'xml2js';
import api from "../src/services/api";


jest.mock("../src/services/api", () => {
    return {
        get: jest.fn().mockResolvedValue({ data: "response data" })
    };
});

describe("Testes unitarios classe Cptec", () =>{
    it("lista Cidades", async () => {
        const cptec = new Cptec();
        const cidade = "santa branca";
        await cptec.listaCidades(cidade);

        expect(api.get).toHaveBeenCalledWith(`/listaCidades?city=${cidade.toLocaleLowerCase()}`);
    });

    it("previsao", async () => {
        const cptec = new Cptec();
        const id = "5515"
        await cptec.previsao(id);

        expect(api.get).toHaveBeenCalledWith(`/cidade/${id}/previsao.xml`);
    });
})

/*
describe("Cptec", () => {
    test("Lista Cidade", async () => {
        const cptec = new Cptec();
        
        const listaCidadesData = await cptec.listaCidades("santa branca");
        
        expect(listaCidadesData).toEqual(
        expect.stringContaining("<nome>Santa Branca</nome>")
       );
    });

    test("Previsão", async () => {
        const cptec = new Cptec();
        
        const previsao = await cptec.previsao("4528");
        
        expect(previsao).toEqual(
        expect.stringContaining("<nome>Santa Branca</nome>")
       );
    });

});
*/
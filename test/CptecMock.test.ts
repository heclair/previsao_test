import { NextFunction, Request, Response } from "express";
import request from "supertest";
import PrevisaoController from "../src/controllers/PrevisaoController";
import Cptec from "../src/services/Cptec";
import { parseString } from 'xml2js';


jest.mock("../src/services/api", () => {});

it("Lista cidades", async() =>{
    const cptec = new Cptec();
    const r = await cptec.listaCidades("santa branca");
    expect(r).toMatch(/<nome>Santa Branca<\/nome>/i);
});


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
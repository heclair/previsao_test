import { Request, Response } from "express";
import controller from "../src/controllers/PrevisaoController";
import Cptec from "../src/services/Cptec";

describe("Cptec", () => {
    it("Lista cidades", async () => {
      
        const req = {params:{cidade: "santa branca"}} as unknown as Request;
        const res = {} as unknown as Response;
        const next = () => {};
        
        await controller.listaCidades(req,res, next);
        
        expect(res.locals).toEqual( {
            id: "4528",
            nome: "Santa Branca",
            uf: "SP"
          });
    });

    it("Previsão", async () => {
      
        const req = {} as Request;
        const res = {
            json: jest.fn(),
            locals:{id: "4528"}
        } as unknown as Response;
        
        await controller.previsao(req, res);
        
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({"nome": "Santa Branca"})
       );
    });

    it("Previsão de 7 dias", async () => {
      
        const req = {} as Request;
        const res = {
            json: jest.fn(),
            locals:{id: "4528"}
        } as unknown as Response;
        
        await controller.previsao7dias(req, res);
        
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({"nome": "Santa Branca"})
           
       );
    });

    it("Previsão Estendida", async () => {
        
        const req = {} as Request;
        const res = {
            json: jest.fn(),
            locals:{id: "4528"}
        } as unknown as Response;
        
        await controller.previsaoEstendida(req, res);
        
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({"nome": "Santa Branca"})

       );
    });
});
import { Request, Response } from "express";
import controller from "../src/controllers/PrevisaoController";
import Cptec from "../src/services/Cptec";
import PrevisaoController from "../src/controllers/PrevisaoController";

jest.mock("../src/services/Cptec", () => {
    return jest.fn()
        .mockImplementationOnce(() => {
            return {
                listaCidades: jest.fn().mockImplementation(() => {
                        return "<note><cidade>santa branca</cidade></note>";
                    })
            };
        })
        .mockImplementationOnce(() => {
            return {
                listaCidades: jest.fn().mockImplementation(() => {
                        return undefined;
                    })
            }
        })
        .mockImplementationOnce(() => {
            return {
                previsao: jest.fn().mockImplementation(() => {
                        return "<note><cidade>santa branca</cidade></note>";
                    })
            };
        })
        .mockImplementationOnce(() => {
            return {
                previsao: jest.fn().mockImplementation(() => {
                        return undefined;
                    })
            }
        });
});

describe("Testes unitarios previsao", () => {
    const previsao = PrevisaoController;

    test("listaCidades válido", async () => {
        const req: Request = { params: { cidade: "caraguatatuba" } } as unknown as Request;
        const res = { locals: {} } as unknown as Response;

        const next = jest.fn();

        await previsao.listaCidades(req, res, next);

        expect(res.locals).not.toBeNull();
        expect(next).toHaveBeenCalled();
    });

    test("listaCidades invalido", async () => {
        const req = { params: { cidade: "taubate" }} as unknown as Request;
        const res = { json: jest.fn() } as unknown as Response;

        const next = jest.fn();

        await previsao.listaCidades(req, res, next);
        
        expect(res.json).toHaveBeenCalled();
    });

    test("previsao valido", async () => {
        const req = {} as unknown as Request;
        const res = {
            locals: { id: "10" },
            json: jest.fn()
        } as unknown as Response;

        await previsao.previsao(req, res);

        expect(res.json).not.toHaveBeenCalledWith({ message: expect.any(TypeError) });
    })

    test("previsao invalido", async () => {
        const req = {} as unknown as Request;
        const res = {
            locals: { id: "10" },
            json: jest.fn()
        } as unknown as Response;

        await previsao.previsao(req, res);

        expect(res.json).toHaveBeenCalledWith({message: expect.any(TypeError)});
    })
});

/*
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

*/
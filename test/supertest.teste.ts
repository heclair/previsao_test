import request from "supertest";
import app from "../src";


describe("Teste de integração da previsão", () => { 
    it("Previsão Válido", async () => {
        const response = await request(app).get("/previsao/santa branca");
        
        expect(response.body.nome).toBe("Santa Branca");
    });

    it("Previsão 7 dias Válido", async () => {
        const response = await request(app).get("/previsao7/santa branca");
        
        expect(response.body.nome).toBe("Santa Branca");
    });

    it("Previsão estendida Válido", async () => {
        const response = await request(app).get("/estendida/santa branca");
        
        expect(response.body.nome).toBe("Santa Branca");
    });
});
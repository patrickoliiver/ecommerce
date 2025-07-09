import { CEPResponse } from "@/types";
import { config } from "@/config";

class ExternalApiService {
  async getCEP(cep: string): Promise<CEPResponse> {
    const cleanCEP = cep.replace(/\D/g, "");

    if (cleanCEP.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos");
    }

    try {
      const response = await fetch(
        `${config.external.viaCepUrl}/${cleanCEP}/json/`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP");
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      return data;
    } catch (error) {
      console.error("CEP request failed:", error);
      throw error;
    }
  }
}

export const externalApiService = new ExternalApiService();

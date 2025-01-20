const documentValidator = {
  isValidCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    const calculateDigit = (cnpj: string, weights: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(cnpj[i]) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const digit1 = calculateDigit(cnpj, weights1);
    const digit2 = calculateDigit(cnpj, weights2);

    return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
  },

  isValidCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); 
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const calculateDigit = (cpf: string, factor: number): number => {
      let sum = 0;
      for (let i = 0; i < factor - 1; i++) {
        sum += parseInt(cpf[i]) * (factor - i);
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calculateDigit(cpf, 10);
    const digit2 = calculateDigit(cpf, 11);

    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
  },
};

export default documentValidator;
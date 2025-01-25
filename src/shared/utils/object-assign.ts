/* eslint-disable @typescript-eslint/no-explicit-any */
export const replaceKeysAndValues = (obj: any, replacement: any) => {
  if (Array.isArray(obj) && Array.isArray(replacement)) {
    // Limpa o array x e substitui pelos valores de y
    obj.length = 0
    obj.push(...replacement)
  } else if (
    typeof obj === 'object' &&
    obj !== null &&
    typeof replacement === 'object' &&
    replacement !== null
  ) {
    // Remove todas as chaves de x
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        delete obj[key]
      }
    }
    // Adiciona as chaves e valores de y em x
    Object.assign(obj, replacement)
  } else {
    throw new Error(
      'Ambos os parâmetros devem ser objetos ou arrays compatíveis.',
    )
  }
}

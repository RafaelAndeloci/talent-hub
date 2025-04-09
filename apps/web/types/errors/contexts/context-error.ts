export class ContextError extends Error {
  constructor(ctxName: string, hookName: string) {
    super(`Cannot use ${hookName} outside a <${ctxName} />`);
  }
}

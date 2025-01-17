import { NextFunction, Request, Response } from 'express';

const logging = (req: Request, res: Response, next: NextFunction) => {
  console.log(`\nRunning ${req.method} ${req.path}`);
  const start = Date.now();
  next();
  const end = Date.now();

  console.log(`Finished ${req.method} ${req.path} in ${end - start}ms\n`);
};

export default logging;
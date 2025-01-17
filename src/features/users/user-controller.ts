import { Request, Response } from 'express';
import userBusiness from './user-business';

const userController = {
  create: async ({ body }: Request, res: Response) => {
    const user = await userBusiness.create(body);

    res.status(201).json(user);
  },

  auth: async (req: Request, res: Response) => {
    const token = await userBusiness.auth({
      ...req.body,
      userId: req.params.id,
    });

    res.status(200).json(token);
  },
};

export default userController;

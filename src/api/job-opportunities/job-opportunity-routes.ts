import { Router } from "express";
import JobOpportunityController from "./job-opportunity-controller";
import jobOpportunitySchemas from "./job-opportunity-schema"; 
import validate from "../../middlewares/validation-middleware";
import errorHandlerWrapper from "../../middlewares/error-handler-middle";

const jobOpportunityRouter = Router();

jobOpportunityRouter.get(
  "/",
  validate(jobOpportunitySchemas.findAll),
  errorHandlerWrapper(JobOpportunityController.findAll)
);

jobOpportunityRouter.get(
  "/:id",
  validate(jobOpportunitySchemas.findById),
  errorHandlerWrapper(JobOpportunityController.findById)
);

jobOpportunityRouter.post(
  "/",
  validate(jobOpportunitySchemas.create),
  errorHandlerWrapper(JobOpportunityController.create)
);

jobOpportunityRouter.put(
  "/:id",
  validate(jobOpportunitySchemas.update),
  errorHandlerWrapper(JobOpportunityController.update)
);

jobOpportunityRouter.delete(
  "/:id",
  validate(jobOpportunitySchemas.remove),
  errorHandlerWrapper(JobOpportunityController.remove)
);

export default jobOpportunityRouter;
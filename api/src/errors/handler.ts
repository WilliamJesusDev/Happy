import { ErrorRequestHandler } from "express";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: "Validation fails", errors });
  }

  if (error instanceof EntityNotFoundError) {
    let errors: ValidationErrors = {};

    errors[error.name] = new Array(error.message);

    return response.status(400).json({ message: "Validation fails", errors });
  }

  console.error(error);

  return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;

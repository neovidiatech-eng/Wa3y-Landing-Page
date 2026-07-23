import { useMutation } from "@tanstack/react-query";
import { submitTeacherApplication } from "../services/form";
import { ApplicationPayload, ApplicationResponse } from "../types";

export const useApplication = () => {
  return useMutation<ApplicationResponse, Error, ApplicationPayload>({
    mutationFn: submitTeacherApplication,
  });
};

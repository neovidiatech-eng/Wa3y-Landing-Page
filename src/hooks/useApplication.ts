import { useMutation } from "@tanstack/react-query";
import { submitTeacherApplication, submitSupervisorApplication, verifyAccount } from "../services/form";
import { ApplicationPayload, ApplicationResponse, SupervisorPayload, VerifyAccountPayload } from "../types";

export const useApplication = () => {
  return useMutation<ApplicationResponse, Error, ApplicationPayload>({
    mutationFn: submitTeacherApplication,
  });
};

export const useSupervisorApplication = () => {
  return useMutation<ApplicationResponse, Error, SupervisorPayload>({
    mutationFn: submitSupervisorApplication,
  });
};

export const useVerifyAccount = () => {
  return useMutation<ApplicationResponse, Error, VerifyAccountPayload>({
    mutationFn: verifyAccount,
  });
};

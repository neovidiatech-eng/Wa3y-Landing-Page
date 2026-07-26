import { useMutation } from "@tanstack/react-query";
import { submitTeacherApplication, verifyAccount } from "../services/form";
import { ApplicationPayload, ApplicationResponse, VerifyAccountPayload } from "../types";

export const useApplication = () => {
  return useMutation<ApplicationResponse, Error, ApplicationPayload>({
    mutationFn: submitTeacherApplication,
  });
};

export const useVerifyAccount = () => {
  return useMutation<ApplicationResponse, Error, VerifyAccountPayload>({
    mutationFn: verifyAccount,
  });
};

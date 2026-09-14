import { api } from "../axios";
import { ApplicationPayload, ApplicationResponse, SupervisorPayload, VerifyAccountPayload } from "../types";

export const submitTeacherApplication = async (
  payload: ApplicationPayload
): Promise<ApplicationResponse> => {
  const response = await api.post<ApplicationResponse>("auth/sign-up-teacher", payload);
  return response.data;
};

export const submitSupervisorApplication = async (
  payload: SupervisorPayload
): Promise<ApplicationResponse> => {
  const response = await api.post<ApplicationResponse>("moderator/sign-up-moderator", payload);
  return response.data;
};

export const verifyAccount = async (
  payload: VerifyAccountPayload
): Promise<ApplicationResponse> => {
  const response = await api.post<ApplicationResponse>("auth/verify-account", payload);
  return response.data;
};

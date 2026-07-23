import { api } from "../axios";
import { ApplicationPayload, ApplicationResponse } from "../types";

export const submitTeacherApplication = async (
  payload: ApplicationPayload
): Promise<ApplicationResponse> => {
  const response = await api.post<ApplicationResponse>("auth/sign-up-teacher", payload);
  return response.data;
};

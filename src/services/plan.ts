import { api } from "../axios";
import { PlansResponse } from "../types";

export const getPlans = async (): Promise<PlansResponse> => {
    const response = await api.get<PlansResponse>("subscription/plans");
    return response.data;
};

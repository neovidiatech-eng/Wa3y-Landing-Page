import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../services/plan";

export const usePlans = () => {
    return useQuery({
        queryKey: ["plans"],
        queryFn: getPlans,
    });
};
    
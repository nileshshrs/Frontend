import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../api/api";
import { SESSIONS } from "./useSession";

const useDeleteSession = () => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation({
        mutationFn: (sessionId: string) => deleteSession(sessionId),
        onSuccess: () => {
            // Force refetch of the SESSIONS data
            queryClient.invalidateQueries([SESSIONS], { exact: true });
        },
        onError: (error) => {
            console.error("Failed to delete session:", error);
        },
    });

    return { deleteSession: mutate, ...rest };
};

export default useDeleteSession;

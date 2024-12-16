import { useQuery } from "@tanstack/react-query";
import { Connections } from "../utils/types";
import { getConnection } from "../api/api";


export const useConnections = () => {
    const { data: connections, refetch, error, isLoading } = useQuery<Connections[]>({
        queryKey: ['connections'],
        queryFn: getConnection,
        onError: (error: any) => {
            console.log("failed to fetch connections", error)
        }
    })

    return { connections, refetch, error, isLoading }
}
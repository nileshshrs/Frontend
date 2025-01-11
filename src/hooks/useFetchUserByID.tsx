import { useQuery } from "@tanstack/react-query"
import { getUserByID } from "../api/api"
import { queryClient } from "../main";

const useFetchUserByID = (id: string) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => getUserByID(id),
        onError: (error: any) => {
            console.log(error);
        },
        enabled: !!id,
    })


    return { fetchedUser: data, isLoading, refetch };
}

export default useFetchUserByID;
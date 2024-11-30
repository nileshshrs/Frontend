import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getSessions } from "../api/api";

// Define the session data structure
interface Session {
    _id: string;        // Unique session ID
    createdAt: string;  // Date when the session was created
    isCurrent: boolean;
    userAgent: string // Whether the session is the current one
}

export const SESSIONS = 'sessions';

const useSession = (opt: UseQueryOptions<Session[], Error> = {}) => {
    // Use useQuery to fetch sessions from the API
    const queryResult: UseQueryResult<Session[], Error> = useQuery<Session[], Error>({
        queryKey: [SESSIONS],
        queryFn: getSessions, // Fetch sessions from the API
        ...opt,
    });

    // Return the query result which includes data (sessions), loading, error, etc.
    return queryResult;
};

export default useSession;

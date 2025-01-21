import useSession from '../hooks/useSession';
import useDeleteSession from '../hooks/useDeleteSession';
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import Loader from '../components/utils/Loader';
import { MdDelete } from "react-icons/md";

const Sessions = () => {
  const { data: sessions = [], isLoading} = useSession();
  const { deleteSession, isLoading: isDeleting } = useDeleteSession();

  if (isLoading) {
    return <div><Loader/></div>;
  }


  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full px-5 py-10">
      <h2 className="text-xl font-bold p-5">Sessions</h2>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <Card
            key={session._id}
            className="shadow-lg hover:shadow-xl transition-all duration-300 p-5 w-[80%] min-h-[180px]"
          >
            <CardHeader className="py-1">
              <CardDescription>
                <strong>Created At:</strong> {new Date(session.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-1">
              <p>
                <strong>Session name:</strong> {session.userAgent}
              </p>
            </CardContent>
            <CardFooter className="py-1 flex justify-between items-center">
              <p>Status: {session.isCurrent ? 'Active' : 'Inactive'}</p>
              {!session.isCurrent ? (
                <button
                  onClick={() => deleteSession(session._id)}
                  disabled={isDeleting}
                  className={`bg-red-500 text-white px-3 py-1 rounded-md ${isDeleting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-red-600 transition-all duration-200'
                    }`}
                >
                  {isDeleting ? <MdDelete /> : <MdDelete />}
                </button>
              ) : (
                null
              )}
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No sessions available</p>
      )}
    </div>
  );
};

export default Sessions;

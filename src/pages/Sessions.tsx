import React from 'react';
import useSession from '../hooks/useSession';
import useDeleteSession from '../hooks/useDeleteSession';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';

const Sessions = () => {
  const { data: sessions = [], isLoading, isError, error } = useSession();
  const { deleteSession, isLoading: isDeleting } = useDeleteSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full px-5 py-10">
      <h2 className="text-xl font-bold p-5">Sessions</h2>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <Card key={session._id} className="shadow-lg hover:shadow-xl transition-all duration-300 p-5">
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
              <button
                onClick={() => deleteSession(session._id)}
                disabled={isDeleting}
                className={`bg-red-500 text-white px-3 py-1 rounded-md ${isDeleting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-red-600 transition-all duration-200'
                  }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
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

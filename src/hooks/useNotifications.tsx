import { useMutation, useQuery } from '@tanstack/react-query';
import { createNotifications, getAllNotification, updateNotifications } from '../api/api';
import { useSocketContext } from '../context/SocketContext';

// Define a type for the notification data
type NotificationData = {
    recipient: string;
    type: 'like' | 'comment' | 'follow'; // Customize based on your notification types
    post: string | null
};

// Custom hook for handling notifications
const useNotificationMutation = () => {
    const { socket } = useSocketContext()
    const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
        mutationFn: async (data: NotificationData) => {
            return await createNotifications(data)
        },
        onSuccess: (data) => {
            const notification = data.notification
            // console.log(notification)
            socket?.emit("notify", notification);
        },
        onError: (error: any) => {
            console.error('Error creating notification:', error);
        }
    });

    return { mutate, isLoading, isError, isSuccess, error, data };
};

export default useNotificationMutation;

export const useNotifications = () => {
    const { data: notifications, isLoading, isError, error, refetch } = useQuery(
        ['notifications'], // Unique key for this query
        getAllNotification // Function that fetches data
    );

    // Count the number of unread notifications (assuming the "read" field is boolean)
    const unreadCount = notifications?.filter((notification: any) => !notification.read).length || 0;

    return { notifications, isLoading, isError, error, unreadCount, refetch };
};


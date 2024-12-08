export const formatTimeAgo = (timestamp: string): string => {
    const now = new Date(); // Get the current time
    const updatedAt = new Date(timestamp); // Convert the timestamp to a Date object
    const diffInMilliseconds = now.getTime() - updatedAt.getTime(); // Calculate the difference in milliseconds

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Return the appropriate time difference in a human-readable format
    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else {
        return updatedAt.toLocaleDateString(); // Show the exact date if more than 30 days ago
    }
};
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
        return `${diffInSeconds} s${diffInSeconds === 1 ? '' : ''} ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} m${diffInMinutes === 1 ? '' : ''} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} H${diffInHours === 1 ? '' : ''} ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} D${diffInDays === 1 ? '' : ''} ago`;
    } else {
        return updatedAt.toLocaleDateString(); // Show the exact date if more than 30 days ago
    }
};
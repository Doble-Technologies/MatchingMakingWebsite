export const getTimeAgo = (epochTime, full = false) => {
  if (!epochTime) return '';
  
  const now = Date.now();
  const diffInSeconds = Math.floor((now - epochTime) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${full ? 'second' : 'sec'}${diffInSeconds === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${full ? 'minute' : 'min'}${minutes === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${full ? 'hour' : 'hr'}${hours === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${full ? 'month' : 'mo'}${months === 1 ? '' : full ? 's' : "'s"} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${full ? 'year' : 'yr'}${years === 1 ? '' : 's'} ago`;
  }
};
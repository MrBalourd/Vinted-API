export function formatTimeDescription(time, isLogin) {
    const now = new Date();
    const timeDifference = now - time;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);

    if (isLogin) {
        if (secondsDifference < 60) {
            return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
        } else if (minutesDifference < 60) {
            return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(hoursDifference / 24);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    } else {
        if (secondsDifference < 60) {
            return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
        } else if (minutesDifference < 60) {
            return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(hoursDifference / 24);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    }
}
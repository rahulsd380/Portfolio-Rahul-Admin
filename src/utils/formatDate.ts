/* eslint-disable @typescript-eslint/no-explicit-any */
function formatDate(dateString:string) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Helper function to get the ordinal suffix
    function getOrdinalSuffix(day:any) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }

    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    return `${dayWithSuffix} ${month}, ${year}`;
  }

  export default formatDate
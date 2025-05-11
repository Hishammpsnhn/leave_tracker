export const convertUTCToLocalTimeOnly = (utcString:string) => {
  const localDate = new Date(utcString);
  return localDate.toLocaleTimeString(); 
};
export const convertUTCToLocalDateOnly = (utcString: string): string => {
  const localDate = new Date(utcString);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(localDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; 
};

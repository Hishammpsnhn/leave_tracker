import { parse, differenceInMinutes, differenceInSeconds } from 'date-fns';

export const convertUTCToLocalTimeOnly = (utcString:Date):string => {
  const localDate = new Date(utcString);
  return localDate.toLocaleTimeString(); 
};

export function getTimeDifferenceHHMM(signIn: string, signOut: string): string {
  const referenceDate = new Date(); 

  const signInDate = parse(signIn, 'h:mm:ss a', referenceDate);
  const signOutDate = parse(signOut, 'h:mm:ss a', referenceDate);

  
  const totalSeconds = differenceInSeconds(signOutDate, signInDate);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


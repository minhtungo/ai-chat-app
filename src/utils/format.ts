import { default as dayjs } from 'dayjs';

export function formatDate(date: number) {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
}

export function formatSecondsToMMSS(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

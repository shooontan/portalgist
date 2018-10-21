import { Dayjs as OrignalDayjs } from 'dayjs';

declare module 'dayjs' {
  interface Dayjs extends OrignalDayjs {
    fromNow(): string;
  }
}

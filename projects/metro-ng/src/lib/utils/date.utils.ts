
export const jalaaliMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
export function gregorianDateToJalaliString(date: Date): string {
  const gy = date.getFullYear();
  const gm = date.getMonth();
  const gd = date.getDate();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  const [jy, jm, jd] = gregorianToJalali(gy, gm, gd);

  return `${jy}/${padZero(jm)}/${padZero(jd)} ${hours}:${minutes}:${seconds}`;
}

function padZero(n: number): string {
  return n < 10 ? '0' + n : n.toString();
}

export function gregorianToJalali(gy: number, gm: number, gd: number): number[] {
  gm++;
  let g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0 || gy % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let jy = (gy <= 1600) ? 0 : 979;
  gy -= (gy <= 1600) ? 621 : 1600;
  let gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd;
  for (let i = 0; i < gm; i++) {
    days += g_d_m[i];
  }
  let jy2 = jy + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy2 += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy2 += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
  return [jy2, jm, jd];
}

import moment, { unitOfTime } from 'moment';
import 'moment-timezone';

interface IDurationTime {
  second?: number;
  minute?: number;
  hour?: number;
}

interface IDurationDate {
  day: number;
  week?: number;
  month?: number;
  year?: number;
}

export function addTimeWithDuration(data: { time: Date; duration: IDurationTime }): Date {
  const time = moment(data.time).tz('UTC');
  data.duration.second && time.add(data.duration.second, 'seconds');
  data.duration.minute && time.add(data.duration.minute, 'minutes');
  data.duration.hour && time.add(data.duration.hour, 'hours');
  return time.toDate();
}

export function addDateWithDuration(data: { date: Date; duration: IDurationDate }) {
  const time = moment(data.date).tz('UTC');

  data.duration.day && time.add(data.duration.day, 'days');
  data.duration.week && time.add(data.duration.week, 'weeks');
  data.duration.month && time.add(data.duration.month, 'months');
  data.duration.year && time.add(data.duration.year, 'years');
  return time.toDate();
}

/**
 * @param month là tháng từ 1 -> 12
 */
export function getDaysInMonth(data: { month: number; year: number }, paramsAddToDate?: any) {
  const formatMonth = data.month < 10 ? `0${data.month}` : data.month;

  let date = moment(new Date(`${data.year}-${formatMonth}-01`));
  const daysInMonth = [];

  // date.month() tính từ 0
  while (date.month() + 1 === data.month) {
    daysInMonth.push({ date: date.toDate(), dayInWeek: date.day(), dayInMonth: Number(date.format('DD')), ...(paramsAddToDate || {}) });
    date = date.add(1, 'days');
  }
  return daysInMonth;
}

export function getHoursInDay(data: { startHour: number; endHour: number; duration: IDurationTime }) {
  const TOTAL_HOUR_TO_ADD = data.duration.hour + data.duration.minute / 60;
  const HOUR_SKIP = 12;
  const HOUR_START_WORK_AFTER_SKIPPING = 13;
  const result = [];

  let hour = data.startHour;
  while (hour <= data.endHour - TOTAL_HOUR_TO_ADD) {
    if (hour + TOTAL_HOUR_TO_ADD <= HOUR_SKIP || hour + TOTAL_HOUR_TO_ADD >= HOUR_START_WORK_AFTER_SKIPPING) {
      const startHour = hour;
      const endHour = hour + TOTAL_HOUR_TO_ADD;
      result.push({
        startHour,
        endHour,
        startHourFormat: formatHour(startHour),
        endHourFormat: formatHour(endHour),
      });
    }

    hour = hour + TOTAL_HOUR_TO_ADD;
    if (hour >= HOUR_SKIP && hour <= HOUR_START_WORK_AFTER_SKIPPING) {
      hour = HOUR_START_WORK_AFTER_SKIPPING;
    }
  }

  return result;
}

function formatHour(hour: any) {
  const dateDefault = '2023-09-09';
  const minutes = Math.floor((hour - parseInt(hour)) * 60);
  const hours = Math.floor(hour);
  return moment(new Date(dateDefault)).tz('UTC').hours(hours).minutes(minutes).format('HH:mm');
}

export function getCurrentDate() {
  return moment().tz('UTC').add(7, 'hours').startOf('day').toDate();
}

export function getTomorrowDate() {
  return moment().tz('UTC').add(7, 'hours').startOf('day').add(1, 'day').toDate();
}

export function getStartOfTomorrowDate() {
  return moment().tz('UTC').add(7, 'hours').startOf('day').add(1, 'day').toDate();
}

export function getCurrentTime() {
  return moment().tz('UTC').add(7, 'hours').toDate();
}

export function getStartOfCurrentDate() {
  return moment().tz('UTC').add(7, 'hours').startOf('day').toDate();
}

export function getEndOfCurrentDate() {
  return moment().endOf('day').add(7, 'hours').tz('UTC').toDate();
}

export function getStartOfCurrentWeek() {
  const weekStart = moment().tz('UTC').add(7, 'hours').startOf('day').set('day', 1).toDate();
  return weekStart;
}

export function getEndOfCurrentWeek() {
  const weekEnd = moment().tz('UTC').add(7, 'hours').set('day', 7).endOf('day').toDate();
  return weekEnd;
}

export function formatHourToText(data: { hour: number }) {
  const hour = Math.floor(data.hour);
  const minute = Math.floor((data.hour - hour) * 60);
  let result = `${hour} giờ`;
  if (minute) result += ` ${minute} phút`;
  return result;
}

export function getStartDateOfCurrentMonth() {
  return moment().tz('UTC').add(7, 'hours').startOf('month').toDate();
}

export function getStartDateOfMonth(month: number, year?: number) {
  let result = moment().tz('UTC').add(7, 'hours');
  if (year) result = result.year(year);

  return result
    .startOf('month')
    .set('month', month - 1) // tháng 1 bắt đầu từ 0
    .toDate();
}

export function getEndDateOfCurrentMonth() {
  return moment().tz('UTC').add(7, 'hours').endOf('month').toDate();
}

export function getEndDateOfMonth(month: number, year?: number) {
  let result = moment().tz('UTC').add(7, 'hours');
  if (year) result = result.year(year);

  return result
    .set('month', month - 1) // tháng 1 bắt đầu từ 0
    .endOf('month')
    .toDate();
}

export function isToday(date: Date) {
  return moment(date).tz('UTC').format('YYYY-MM-DD') === moment().tz('UTC').add(7, 'hours').format('YYYY-MM-DD');
}

export function getCurrentHour() {
  return moment().tz('UTC').add(7, 'hours').hours();
}

export function getDaysInMonthByVietnameseCalendar(data: { month: number; year: number }) {
  const formatMonth = data.month < 10 ? `0${data.month}` : data.month;

  let date = moment(new Date(`${data.year}-${formatMonth}-01`)).tz('UTC');
  const endDate = moment(date).add(7, 'hours').add(1, 'days').endOf('month');
  const dayInWeekOfTheLastDayOfTheMonth = endDate.days();
  if (dayInWeekOfTheLastDayOfTheMonth !== 0) endDate.add(7 - dayInWeekOfTheLastDayOfTheMonth, 'days');

  const dayInWeekOfTheFirstDayOfTheMonth = date.days();
  if (dayInWeekOfTheFirstDayOfTheMonth === 0) {
    date = date.subtract(6, 'days'); // nếu là chủ nhật thì phải trừ để thành thứ 2
  } else {
    date = date.days(1);
  }

  const daysInMonth = [];

  while (moment(date) < moment(endDate)) {
    daysInMonth.push({ date: date.toDate(), dayInWeek: date.day(), dayInMonth: Number(date.format('DD')) });
    date = date.add(1, 'days');
  }
  return daysInMonth;
}

export function getStartDateOfCurrentWeek() {
  return moment().tz('UTC').add(7, 'hours').startOf('week').add(1, 'day').toDate(); // +1 ngày thành T2 vì lịch nước ngoài đầu tuần là CN
}

export function getEndDateOfCurrentWeek() {
  return moment().tz('UTC').add(7, 'hours').endOf('week').add(1, 'day').toDate(); // +1 ngày thành CN vì lịch nước ngoài cuối tuần là T7
}

export function convertDurationToVietnameseText(duration: IDurationDate) {
  if (duration.day === -1 && duration.month === -1 && duration.week === -1 && duration.year === -1) {
    return 'Vô hạn';
  }
  let text = '';
  if (duration.day) text += `${duration.day} ngày `;
  if (duration.week) text += `${duration.week} tuần `;
  if (duration.month) text += `${duration.month} tháng `;
  if (duration.year) text += `${duration.year} năm `;
  return text.trim();
}

/** @description
 * Check xem có < với value được so sánh không?
 */
export function isLessThanWithTime(data: { input: IDurationTime; comparedValue: IDurationTime }) {
  const formatInput = (data.input.hour || 0) * 3600 + (data.input.minute || 0) * 60 + (data.input.second || 0);
  const formatStart = (data.comparedValue.hour || 0) * 3600 + (data.comparedValue.minute || 0) * 60 + (data.comparedValue.second || 0);
  return formatInput < formatStart;
}

/** @description
 * Check xem có >= và <= với start và end không?
 */
export function isInRangeWithEqualWithTime(data: { value: IDurationTime; start: IDurationTime; end: IDurationTime }) {
  const formatInput = (data.value.hour || 0) * 3600 + (data.value.minute || 0) * 60 + (data.value.second || 0);
  const formatStart = (data.start.hour || 0) * 3600 + (data.start.minute || 0) * 60 + (data.start.second || 0);
  const formatEnd = (data.end.hour || 0) * 3600 + (data.end.minute || 0) * 60 + (data.end.second || 0);

  return formatInput >= formatStart && formatInput <= formatEnd;
}

/** @description
 * Check xem có > và < với start và end không?
 */
export function isInRangeWithoutEqualWithTime(data: { value: IDurationTime; start: IDurationTime; end: IDurationTime }) {
  const formatInput = (data.value.hour || 0) * 3600 + (data.value.minute || 0) * 60 + (data.value.second || 0);
  const formatStart = (data.start.hour || 0) * 3600 + (data.start.minute || 0) * 60 + (data.start.second || 0);
  const formatEnd = (data.end.hour || 0) * 3600 + (data.end.minute || 0) * 60 + (data.end.second || 0);
  return formatInput > formatStart && formatInput < formatEnd;
}

export function isGreaterWithInRangeWithTime(data: { value: IDurationTime; start: IDurationTime; end: IDurationTime }) {
  const formatInput = (data.value.hour || 0) * 3600 + (data.value.minute || 0) * 60 + (data.value.second || 0);
  const formatStart = (data.start.hour || 0) * 3600 + (data.start.minute || 0) * 60 + (data.start.second || 0);
  const formatEnd = (data.end.hour || 0) * 3600 + (data.end.minute || 0) * 60 + (data.end.second || 0);
  return formatInput > formatStart && formatInput > formatEnd;
}

export function isLessWithInRangeWithTime(data: { value: IDurationTime; start: IDurationTime; end: IDurationTime }) {
  const formatInput = (data.value.hour || 0) * 3600 + (data.value.minute || 0) * 60 + (data.value.second || 0);
  const formatStart = (data.start.hour || 0) * 3600 + (data.start.minute || 0) * 60 + (data.start.second || 0);
  const formatEnd = (data.end.hour || 0) * 3600 + (data.end.minute || 0) * 60 + (data.end.second || 0);
  return formatInput < formatStart && formatInput < formatEnd;
}

export function getFromTodayToEndOfCurrentMonth(data?: { paramsAddToDate?: any }) {
  const TODAY = moment().tz('UTC').add(7, 'hours').startOf('day');
  const result = [];
  let date = TODAY.clone();
  while (TODAY.month() === date.month()) {
    result.push({ date: date.toDate(), dayInWeek: date.day(), dayInMonth: date.date(), ...(data?.paramsAddToDate || {}) });
    date = date.add(1, 'days');
  }
  return result;
}

export function getFromTomorrowToEndOfCurrentMonth(data?: { paramsAddToDate?: any }) {
  const TODAY = moment().tz('UTC').add(7, 'hours').startOf('day').add(1, 'days');
  const result = [];
  let date = TODAY.clone();
  while (TODAY.month() === date.month()) {
    result.push({ date: date.toDate(), dayInWeek: date.day(), dayInMonth: date.date(), ...(data?.paramsAddToDate || {}) });
    date = date.add(1, 'days');
  }
  return result;
}

/**
 *
 * @param month Tháng theo lịch VN (start from 1)
 * @param paramsAddToDate object muốn thêm vào response
 * @description Get ngày hôm nay cho tới hết tháng ``input``
 */
export function getFromTodayToEndOfMonth(data?: { month: number; paramsAddToDate?: any }) {
  const TODAY = moment().tz('UTC').add(7, 'hours').startOf('day');
  const result = [];
  let date = TODAY.clone();
  while (data.month !== date.month()) {
    result.push({ date: date.toDate(), dayInWeek: date.day(), dayInMonth: date.date(), ...(data?.paramsAddToDate || {}) });
    date = date.add(1, 'days');
  }
  return result;
}

export function getListMonthInYear(paramToAdd?: any) {
  const result: any[] = [];
  for (let i = 1; i <= 12; i++) {
    result.push({
      month: i,
      ...(paramToAdd || {}),
    });
  }
  return result;
}

export function getListDayInWeek(paramToAdd?: any) {
  const result: any[] = [];
  for (let i = 0; i <= 6; i++) {
    result.push({
      dayInWeek: i,
      ...(paramToAdd || {}),
    });
  }
  return result;
}

/**
 * @description
 * Tính khoảng cách giữa 2 ngày ( giờ, phút, giây....)
 */
export function subtractBetweenTwoDates(date_1: Date, date_2: Date, unitOfTime?: unitOfTime.Diff) {
  const format_date_1 = moment(date_1).tz('UTC');
  const format_date_2 = moment(date_2).tz('UTC');
  const result = Math.abs(format_date_1.diff(format_date_2, unitOfTime));
  return result;
}

/**
 * @description
 * So sánh 2 `Date`
 */

export function compareBetweenTwoDates(date_1: Date, typeComprare: '==' | '>=' | '>' | '<=' | '<', date_2: Date) {
  const format_date_1 = moment(date_1).tz('UTC');
  const format_date_2 = moment(date_2).tz('UTC');

  switch (typeComprare) {
    case '==':
      return format_date_1.isSame(format_date_2);
    case '>=':
      return format_date_1.isSame(format_date_2) || format_date_1.isAfter(format_date_2);
    case '>':
      return format_date_1.isAfter(format_date_2);
    case '<=':
      return format_date_1.isSame(format_date_2) || format_date_1.isBefore(format_date_2);
    case '<':
      return format_date_1.isBefore(format_date_2);
  }
}

/**
 * @description
 * Kiểm tra điều kiện \
 *  `start <= Date <= end`
 */

export function isInRangeWithEqualWithDate(input: { date: Date; start: Date; end: Date }) {
  const format_date = moment(input.date);
  const format_start = moment(input.start);
  const format_end = moment(input.end);
  return (
    (format_date.isSame(format_start) || format_date.isAfter(format_start)) && (format_date.isSame(format_end) || format_date.isBefore(format_end))
  );
}

/**
 * @description
 * Kiểm tra điều kiện \
 *  `start < Date < end`
 */

export function isInRangeWithoutEqualWithDate(input: { date: Date; start: Date; end: Date }) {
  const format_date = moment(input.date);
  const format_start = moment(input.start);
  const format_end = moment(input.end);
  return format_date.isAfter(format_start) && format_date.isBefore(format_end);
}

export function differenceInDays(start: Date, end: Date): number {
  const difference = start.getTime() - end.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

export function getMilliseconds(humanReadableTime: string): number {
  const milliseconds = humanReadableTime.match(/\d+\s?\w/g).reduce((acc, cur, i) => {
    let multiplier = 1000;
    switch (cur.slice(-1)) {
      case 'h':
        multiplier *= 60;
      case 'm':
        multiplier *= 60;
      case 's':
        return (parseInt(cur) ? parseInt(cur) : 0) * multiplier + acc;
    }
    return acc;
  }, 0);
  return milliseconds;
}

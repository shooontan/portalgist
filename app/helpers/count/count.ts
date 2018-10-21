const pattern = {
  file: {
    1: 'file',
    other: 'files',
  },
  comment: {
    1: 'comment',
    other: 'comments',
  },
};

export default (unit: string, count: number) => {
  const patternUnit = pattern[unit];

  if (patternUnit) {
    const unitCount = patternUnit[count];
    if (unitCount) {
      return `${count} ${unitCount}`;
    } else {
      return `${count} ${patternUnit.other}`;
    }
  }

  return `${count} ${unit}`;
};

export const _currencyFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const _onCheckImage = (source: string) => {
  if (source === '' || source === null || source.includes('localhost')) {
    return {
      uri: 'https://archive.org/download/no-photo-available/no-photo-available.png',
    };
  } else {
    return {uri: source};
  }
};

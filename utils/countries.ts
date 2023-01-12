export const countries = [
  {
    name: 'Canada',
    code: 'CAN',
    dialCode: '+1',
  },
  {
    name: 'Mexico',
    code: 'MEX',
    dialCode: '+52',
  },
  {
    name: 'United States of America',
    code: 'US',
    dialCode: '+1',
  },
];

export const getCodeCountry = (name: string) => {
  const country = countries.filter((option) => option.name === name);
  if (country.length === 0) return;
  return country[0].dialCode;
};

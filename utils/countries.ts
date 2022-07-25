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
    code: 'EUA',
    dialCode: '+1',
  },
];

export const getCodeCountry = (name: string) => {
  const country = countries.filter((option) => option.name === name);
  return country[0].dialCode;
};

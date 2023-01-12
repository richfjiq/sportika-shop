import * as yup from 'yup';

export const passwordValidation = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'Must be at least 6 characters')
    .required(),
  newPassword: yup.string().min(6, 'Must be at least 6 characters').required(),
  repeatPassword: yup
    .string()
    .required('please retype your new password')
    .oneOf([yup.ref('newPassword'), null], 'Must match with New Password'),
});

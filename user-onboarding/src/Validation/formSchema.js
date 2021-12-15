import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required('Name is required'),
  email: yup
    .string()
    .email('Valid email address required')
    .required('Valid email address required'),
  terms: yup
    .boolean()
    .oneOf([true], 'Must Accept Terms'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password must be at least 6 chars long')
})

export default formSchema;
import React, {useState, useEffect} from 'react';
import NewUserForm from './form';
import axios from 'axios';
import * as yup from 'yup';
import NewUser from './NewUser';
import formSchema from '../Validation/formSchema'
//import './App.css';


const initialFormValues = {
  name: '',
  email: '',
  password: '',
  Terms: 'false',
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}
const initialDisabled = true
const initialUsers = []

export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)  

  const getNewUsers = () => {
    axios.get(`https://reqres.in/api/users`)
      .then(resp => {
        setUsers(resp.data);
      }).catch(err => console.error(err))
  }
  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(resp => {
        console.log(resp.data)
        setUsers([ resp.data, ...users ]);
      }).catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues))
  }
  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate (name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      terms: !!formValues.terms,
      password: formValues.password.trim()
    }
    postNewUser(newUser);
  }
  // useEffect(() => {
  //   getNewUsers()
  // }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <header><h1>User App</h1></header>
          <NewUserForm
          values = {formValues}
          change = {inputChange}
          submit = {formSubmit}
          disabled = {disabled}
          errors = {formErrors}
          /> 
          {
            users.map(newUser => {
              return (
                <NewUser key = {newUser.id} details = {newUser}/>
              )
            })
          }
    </div>
  );
}
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import Mutation from '../Graphql/Mutation';
import { useRouter } from 'next/router';

// auto imports 
import ErrorMessage from '../components/ErrorMessage';

const addUser = () => {

  const [message, setMessage] = useState(null);

  const router = useRouter();

  const [createUser] = useMutation(Mutation.createUser);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('The name is required'),
      lastname: Yup.string()
        .required('The lastname is required'),
      email: Yup.string()
        .email()
        .required('The email is required'),
      password: Yup.string()
        .required('The password is required')
        .min(6, 'The password must be at least 6 characters long')
    }),
    onSubmit: async values => {
      const { name, email, lastname, password } = values;
      try {
        const { data } = await createUser({
          variables: {
            input: {
              name, email, lastname, password
            }
          }
        });

        console.log(
          data
        )
        setMessage(`The user ${data.createUser.name} was created correctly`)
        setTimeout(() => {
          router.push('/login');
        }, 3000);

      } catch (error) {
        setMessage(error.message)
      }
    }
  });


  setTimeout(() => {
    message ? setMessage(null) : null;
  }, 5000);

  return (
    <Layout>

      {message && <ErrorMessage message={message} />}
      <h4 className='text-center text-2xl text-white font-white font-thin'>Create new Account</h4>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'text'}
                placeholder='User name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.name && formik.errors.name
                ? <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.name}</p>
                </div>
                : null
              }


              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname'>
                LastName
              </label>
              <input
                id='lastname'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'text'}
                placeholder='User lastname'
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.lastname && formik.errors.lastname
                ? <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.name}</p>
                </div>
                : null
              }

              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'email'}
                placeholder='User email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email && formik.errors.email
                ? <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.email}</p>
                </div>
                : null
              }

              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'password'}
                placeholder='User password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password
                ? <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.password}</p>
                </div>
                : null
              }

              <input
                type={'submit'}
                className='bg-cyan-500 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 font-thin'
                value={'Create Account'}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default addUser;

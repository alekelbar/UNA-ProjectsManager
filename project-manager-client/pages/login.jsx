import { useFormik } from 'formik';
import React, { useState } from 'react'
import Layout from '../components/Layout'

import * as Yup from 'yup'
import { useMutation } from '@apollo/client';
import Mutation from '../Graphql/Mutation';
import { useRouter } from 'next/router';

// auto imports 
import ErrorMessage from '../components/ErrorMessage';


const login = () => {

  const [AuthUser] = useMutation(Mutation.authUser);

  const router = useRouter();

  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('The email is required'),
      password: Yup.string().min(6, 'The password must be at least 6 characters').required('The password is required')
    }),
    onSubmit: async values => {
      const { email, password } = values;
      try {
        const { data } = await AuthUser({
          variables: {
            input: {
              email,
              password,
            }
          }
        })

        const token = data.AuthUser.token;
        console.log(data)
        localStorage.setItem('token', token);

        setMessage('Auth in progress...')
        setTimeout(() => {
          router.push('/');
        }, 1500);

      } catch (error) {
        setMessage(error.message)
      }
    }


  });

  setTimeout(() => {
    message ? setMessage(null) : null;
  }, 3000);


  return (
    <Layout>
      {message && <ErrorMessage message={message} />}
      <h4 className='text-center text-2xl text-white font-white font-thin'>Projects Manager</h4>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'email'}
                placeholder='User email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              {formik.touched.email && formik.errors.email
                ? <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.email}</p>
                </div>
                : null
              }

              <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'password'}
                placeholder='User password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
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
                value={'Log In'}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default login;

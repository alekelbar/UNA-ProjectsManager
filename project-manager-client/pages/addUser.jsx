import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import Mutation from '../Graphql/Mutation';
import { useRouter } from 'next/router';
import Link from 'next/link';

// auto imports 
import FasterMessages from '../components/FasterMessages';

const addUser = () => {

  const [message, setMessage] = useState(null);

  const router = useRouter();

  const [createUser] = useMutation(Mutation.createUser, {
    fetchPolicy: "no-cache"
  });

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

      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Project Manager</h2>

                <p className="max-w-xl mt-3 text-gray-300">Powered by: KAE Development Studio</p>
                <div>
                  {formik.touched.email && formik.errors.email
                    ? <FasterMessages message={formik.errors.email} />
                    : null
                  }

                  {formik.touched.password && formik.errors.password
                    ? <FasterMessages message={formik.errors.password} />
                    : null
                  }

                  {formik.touched.name && formik.errors.name
                    ? <FasterMessages message={formik.errors.name} />
                    : null
                  }

                  {formik.touched.lastname && formik.errors.lastname
                    ? <FasterMessages message={formik.errors.lastname} />
                    : null
                  }

                  {message && <FasterMessages message={message} />}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Projects Manager</h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
              </div>

              <div className="mt-8">
                <form onSubmit={formik.handleSubmit}>

                  <div className="mt-6">
                    <input
                      type="name"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>

                  <div className="mt-6">
                    <input
                      type="lastname"
                      name="lastname"
                      id="lastname"
                      placeholder="Your lastname"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                    />
                  </div>

                  <div className='mt-6'>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>

                  <div className="mt-6">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>

                  <div className="mt-6">
                    <button type='onSubmit'>
                      <p
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      >
                        Sign in
                      </p>
                    </button>
                  </div>

                </form>

                <Link href={'/login'}>
                  <p className="mt-6 text-sm text-center text-gray-400">Do you have an account yet? <a className="text-blue-500 focus:outline-none focus:underline hover:underline">Login</a>.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default addUser;

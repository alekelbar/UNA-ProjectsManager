import React from 'react'
import Layout from '../components/Layout'

export const addUser = () => {
  return (
    <Layout>
      <h4 className='text-center text-2xl text-white font-white font-thin'>Create new Account</h4>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'text'}
                placeholder='User name'
              />
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname'>
                LastName
              </label>
              <input
                id='lastname'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'text'}
                placeholder='User lastname'
              />
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'email'}
                placeholder='User email'
              />
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                className='shadow appearence-none border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={'password'}
                placeholder='User password'
              />

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

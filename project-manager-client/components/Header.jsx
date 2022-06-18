import { useQuery } from '@apollo/client';
import client from './../config/apollo'
import { useRouter } from 'next/router';
import React from 'react'
import Query from '../Graphql/Query';

const Header = () => {

  const router = useRouter()

  const { data, loading } = useQuery(Query.getUser, {
    fetchPolicy: "no-cache"
  });


  const handleLogout = () => {
    localStorage.removeItem('token');
    client.clearStore();
    router.push('/login');
  }

  if (loading) return null;

  if (!data.getUser) {
    localStorage.removeItem('token');
    router.push('/login')
  }

  return (
    <div className='h-min fixed right-5 top-7'>
      <div className='flex justify-between h-11 sm:flex-col'>
        <p className='mr-4 text-xl animate-bounce'>Welcome: {data.getUser.name}</p>
        <button
          className='text-lg bg-blue-800 hover:bg-gray-800 min-h-full w-1/6 w-auto font-bold uppecase text-xs rounded px-2 text-white shadow-md'
          type='button'
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  )
}

export default Header;

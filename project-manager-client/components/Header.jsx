import { Cache, useQuery } from '@apollo/client';
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
    router.push('/login');
  }

  if (loading) return null;

  if (!data.getUser) {
    localStorage.removeItem('token');
    router.push('/login')
  }

  return (
    <div className='flex justify-between h-11'>
      <p className='mr-2 text-xl animate-bounce'>Welcome: {data.getUser.name}</p>
      <button
        className='bg-blue-800 hover:bg-gray-800 w-1/6 sm:auto min-h-ful font-bold uppecase text-xs rounded px-2 text-white shadow-md'
        type='button'
        onClick={handleLogout}
      >
        LogOut
      </button>
    </div>
  )
}

export default Header;

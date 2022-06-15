import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react'
import Query from '../Graphql/Query';

const Header = () => {

  const router = useRouter()

  const { data, loading } = useQuery(Query.getUser);


  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  if (loading) return null;

  if (!data.getUser) return router.push('/login')

  return (
    <div className='flex justify-between'>
      <p className='mr-2 text-xl'>Welcome: {data.getUser.name}</p>
      <button
        className='bg-blue-800 w-full sm:w-auto font-bold uppecase text-xs rounded px-2 text-white shadow-md'
        type='button'
        onClick={handleLogout}
      >
        LogOut
      </button>
    </div>
  )
}

export default Header;

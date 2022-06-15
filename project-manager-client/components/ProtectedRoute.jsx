import { useRouter } from 'next/router'
import React from 'react'
import HandleLoading from './HandleLogin'

const ProtectedView = () => {
  const router = useRouter()
  router.push('/login')
  return <HandleLoading />
}

export default ProtectedView;
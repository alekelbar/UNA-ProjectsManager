import React from 'react'

const PersonHeaders = ({ colums }) => {
  return (
    <tr className='hover:bg-stone-100'>
      {colums.map(c => (
        <th className="w-min py-2 text-bold text-sm bg-gray-200 pl-2">{c}</th>
      ))}
    </tr>
  )
}

export default PersonHeaders;

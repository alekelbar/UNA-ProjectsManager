import React from 'react'

const PersonHeaders = ({ colums }) => {
  return (
    <tr className='flex flex-col'>
      {colums.map(c => (
        <th key={c} className="border-slate-600 text-center w-min py-3">{c}</th>
      ))}
    </tr>
  )
}

export default PersonHeaders;

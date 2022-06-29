import React from 'react'
import Select from 'react-select';

const DropDownOwn = ({ onChange, options, value, id }) => {

  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value == value) : "";
  }

  return (
    <div className='w-full'>
      <Select
        id={id ? id : null}
        onChange={value => onChange(value)}
        options={options}
        value={defaultValue(options, value)}
        className='block appearance-none w-full bg-white hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline'>
      </Select>
    </div>
  )
}

export default DropDownOwn

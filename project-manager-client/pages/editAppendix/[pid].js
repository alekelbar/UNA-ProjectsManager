import { Formik } from 'formik';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../../components/Layout';
import DropdownMenu from '../../components/DropdownMenu';
import { useMutation, useQuery } from '@apollo/client';
import Query from '../../Graphql/Query';
import HandleLoading from '../../components/HandleLogin';
import DropDownOwn from '../../components/DropDownOwn';
import * as Yup from 'yup'
import Mutation from '../../Graphql/Mutation';
import FasterMessages from '../../components/FasterMessages';
import Swal from 'sweetalert2';

const editAppendix = () => {
  const router = useRouter();

  const [message, setMessage] = useState('');

  const { query: { pid, description, url, owner_id } } = router;
  console.log(pid, description, url);

  const { data } = useQuery(Query.getPeople);

  const [updateAppendix] = useMutation(Mutation.updateAppendix);

  if (!data) return <HandleLoading />

  const people = data.getPeople.map(e => {
    return {
      value: e.id,
      label: e.name
    }
  })

  const validationSchema = Yup.object({
    description: Yup.string().min(10, 'Please describe something else to me.').required('The description are required'),
    url: Yup.string().required('Please add your source file'),
    people: Yup.string().required('The owner is required')
  })

  const handleSubmit = async (values) => {
    console.log("Se envia el submit...");
    try {

      const { people, description, url } = values;
      console.table(values)
      console.log('ID: ', pid)

      await updateAppendix({
        variables: {
          "updateAppendixId": pid,
          "input": {
            "description": description,
            "dataUrl": url,
            "owner": people
          }
        }
      })

      Swal.fire(
        'Updated',
        'Update successfully',
        'success'
      )

      router.push('/appendix');

    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <Layout>
      {message ? <FasterMessages message={message} /> : null}
      <div className='flex justify-center mt-5'>
        <div className='w-full w-full'>

          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
              people: owner_id,
              description: description,
              url: url,
            }}
            onSubmit={
              values => { handleSubmit(values) }
            }
          >
            {props => {
              return (
                <form
                  className='p-5 items-center flex-wrap bg-white shadow-md px-6 rounded pt-3 pb-2 mb-2 flex justify-between w-full'
                  onSubmit={props.handleSubmit}
                >
                  {/* // section */}
                  <div div className='w-full' >
                    <h4 className='text-sm text-gray-800 font-light mt-4'>Appendix form</h4>

                    <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
                      Owner
                    </label>
                    <DropDownOwn
                      name="people"
                      id={'people'}
                      options={people}
                      value={props.values.people}
                      onChange={value => props.setFieldValue('people', value.value)}
                    />

                    <div className='p-1'>
                      <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='description'>
                        Description
                      </label>
                      <input
                        id='description'
                        className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type='text'
                        placeholder='Description'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.description}
                      />
                      {props.touched.description && props.errors.description
                        ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-sm' >
                          <p>{props.errors.description}</p>
                        </div>
                        : null
                      }
                    </div>
                    <div className='p-1'>
                      <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='url'>
                        url
                      </label>
                      <input
                        id='url'
                        className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type='text'
                        placeholder='url'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                      />
                      {props.touched.url && props.errors.url
                        ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-sm' >
                          <p>{props.errors.url}</p>
                        </div>
                        : null
                      }
                    </div>

                  </div>
                  <div className='w-full'>
                    <input
                      type={'submit'}
                      className='bg-cyan-500 w-full mt-1 p-2 text-white uppercas hover:bg-gray-900 font-thin'
                      value={'Add'}
                    />
                  </div>

                </form>
              )
            }}

          </Formik>
        </div >
      </div >
    </Layout >
  )
}

export default editAppendix

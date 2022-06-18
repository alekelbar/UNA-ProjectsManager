import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import DropdownMenu from '../components/DropdownMenu'
import { useMutation, useQuery } from '@apollo/client'
import Query from '../Graphql/Query'
import HandleLoading from '../components/HandleLogin'
import ProtectedView from '../components/ProtectedRoute'
import Mutation from '../Graphql/Mutation'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const AddAppendix = () => {

  const { data, loading, } = useQuery(Query.getOwners);

  const [createAppendix] = useMutation(Mutation.createAppendix);

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      description: '',
      url: '',
      owner: ''
    },
    validationSchema: Yup.object({
      description: Yup.string().min(10, 'Please describe something else to me.').required('The description are required'),
      url: Yup.string().required('Please add your source file'),
      owner: Yup.string().required('The owner is required')
    }),
    onSubmit: async values => {

      try {
        console.log(values)
        const { description, owner, url } = values;
        await createAppendix({
          variables: {
            "input": {
              "description": description,
              "owner": owner,
              "dataUrl": url
            }
          }
        });

        Swal.fire('Added', 'success', 'info')
        router.push('/appendix')
      } catch (error) {
        console.log(error.message)
      }
    }
  });

  if (loading) return <HandleLoading />

  return (
    <Layout>
      {data?.getPeople
        ? <div className='flex justify-center mt-5'>
          <div className='w-full w-full'>
            <form
              className='items-center flex-wrap bg-white shadow-md px-6 rounded pt-3 pb-2 mb-2 flex justify-between w-full'
              onSubmit={formik.handleSubmit}
            >
              {/* // section */}
              <div className='w-full'>

                <DropdownMenu selection={formik} options={data ? data.getPeople : []} />
                {formik.touched.owner && formik.errors.owner
                  ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-sm' >
                    <p>{formik.errors.owner}</p>
                  </div>
                  : null
                }

                <h4 className='text-sm text-gray-800 font-light mt-4'>Appendix form</h4>
                <div className='p-1'>
                  <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='description'>
                    Description
                  </label>
                  <input
                    id='description'
                    className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    placeholder='Description'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description
                    ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-sm' >
                      <p>{formik.errors.description}</p>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.url}
                  />
                  {formik.touched.url && formik.errors.url
                    ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-sm' >
                      <p>{formik.errors.url}</p>
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
          </div>
        </div >

        : <ProtectedView />
      }

    </Layout >
  )
}


export default AddAppendix;
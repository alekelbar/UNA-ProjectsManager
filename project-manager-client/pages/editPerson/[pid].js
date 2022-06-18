import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import HandleLoading from '../../components/HandleLogin';

import Layout from '../../components/Layout';
import Query from '../../Graphql/Query';
import { Formik } from 'formik';
import * as Yup from 'yup'
import Mutation from '../../Graphql/Mutation';
import FasterMessages from '../../components/FasterMessages';
import Swal from 'sweetalert2';


const EditPerson = () => {


  const [hasOccupation, setHasOccupation] = useState(false);

  const [message, setMessage] = useState(null);

  const router = useRouter();
  const { query: { pid } } = router;

  const [updatePerson] = useMutation(Mutation.updatePerson);

  const { data, loading, error } = useQuery(Query.getPerson, {
    variables: {
      getPersonId: pid
    }
  });

  if (error) return <div>{error.message}</div>

  if (loading) return <HandleLoading />

  const handleAcademic = () => {
    setHasOccupation(!hasOccupation);
  }

  const valid_date = () => {
    return new Date(new Date().setFullYear((new Date().getFullYear() - 17) + 1000));;
  }


  const validationSchema = Yup.object({
    name: Yup.string().required('The name is required'),
    lastName: Yup.string().required('The lastName is required'),
    dateOfBirth: Yup.date().required('The date of birth is required').max(valid_date(), 'You need at least 15 years to use this tool'),
    nationality: Yup.string().required('The nacionality is required'),
    city: Yup.string().required('The city is required'),
    village: Yup.string().required('The village is required'),
    description: Yup.string().required('The description is required'),
    phones: Yup.string().required('The phone is required'),
    email: Yup.string().email().required('The email is required'),
    EntryDate: Yup.date().max(new Date(), '0 days working here is not posible to register?'),
  })

  const { id,
    role,
    name,
    lastName,
    dateOfBirth,
    admin,
    nationality,
    address: {
      city,
      village,
      description,
    },
    professional: {
      occupation,
      EntryDate,
    },
    contact: {
      phones,
      email,
    },
  } = data.getPerson;

  const validSchema = {
    role: role[0], dateOfBirth: new Date(dateOfBirth).toLocaleDateString('en-CA'), id, name, lastName, city, village, description, occupation: occupation[0], EntryDate: EntryDate ? new Date(EntryDate).toLocaleDateString('en-CA') : "", phones: phones[0], email, admin, nationality
  }

  //Realizar el mutation
  const handleUpdate = async (values) => {

    const { name, lastName, nationality, city, village, description, phones, email, dateOfBirth, occupation, EntryDate } = values;

    try {
      const { data } = await updatePerson({
        variables: {
          "updatePersonId": id,
          "input": {
            "role": [
              (hasOccupation) ? 'ACADEMIC' : 'STUDENT'
            ],
            "name": name,
            "lastName": lastName,
            "nationality": nationality,
            "address": {
              "city": city,
              "village": village,
              "description": description
            },
            "professional": {
              "occupation": hasOccupation ? [occupation] : '',
              "EntryDate": hasOccupation ? EntryDate : '',
            },
            "contact": {
              "phones": [
                phones
              ],
              "email": email
            },
            "dateOfBirth": dateOfBirth,
          }
        }
      });

      Swal.fire(
        'Updated',
        'Update successfully',
        'success'
      )

      router.push('/');
    } catch (error) {
      setMessage(error.message)
      console.log(error.message)
      setTimeout(() => {
        setMessage(!message);
      }, 4000);
    }

  }

  const resultForm = (props) => {
    return hasOccupation
      ? <form
        className='items-center flex-wrap bg-white shadow-md px-6 rounded pt-3 pb-2 mb-2 flex justify-between w-full'
        onSubmit={props.handleSubmit}
      >

        <div>
          <h4 className='text-sm text-gray-800 font-light mt-4'>Who are you?</h4>
          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              id='name'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Name'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
            />
            {props.touched.name && props.errors.name
              ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-xs'>
                <p>{props.errors.name}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='lastName'>
              lastName
            </label>
            <input
              id='lastName'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='lastName'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName}
            />
            {props.touched.lastName && props.errors.lastName
              ? <div className='bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-xs'>
                <p>{props.errors.lastName}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='dateBirth'>
              dateBirth
            </label>
            <input
              id='dateBirth'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'date'}
              placeholder='dateBirth'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.dateOfBirth}
            />

            {props.touched.dateOfBirth && props.errors.dateOfBirth
              ? <div className='bg-red-100 border-l-2 bor1er-red-500 text-red-700 text-xs'>
                <p>{props.errors.dateOfBirth}</p>
              </div>
              : null
            }
          </div>

          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='nationality'>
              Nacionality
            </label>
            <input
              id='nationality'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Nacionality'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.nationality}
            />
            {props.touched.nationality && props.errors.nationality
              ? <div className='bg-red-100 border-l-2 borde1-red-500 text-red-700 text-xs'>
                <p>{props.errors.nationality}</p>
              </div>
              : null
            }
          </div>
        </div>


        <div>

          <h4 className='text-sm text-gray-800 font-light mt-4'>Address</h4>

          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='city'>
              City
            </label>
            <input
              id='city'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='City'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.city}
            />
            {props.touched.city && props.errors.city
              ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-xs'>
                <p>{props.errors.city}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='village'>
              Village
            </label>
            <input
              id='village'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Village'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.village}
            />
            {props.touched.village && props.errors.village
              ? <div className='bg-red-100 border-l-2 b1rder-red-500 text-red-700 text-xs'>
                <p>{props.errors.village}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='description'>
              Description
            </label>
            <input
              id='description'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Description'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.description}
            />
          </div>
          {props.touched.description && props.errors.description
            ? <div className='bg-red-100 border-l-2 borde1-red-500 text-red-700 text-xs'>
              <p>{props.errors.description}</p>
            </div>
            : null
          }
        </div>
        <div>

          <h4 className='text-sm text-gray-800 font-light mt-4'>Profesional</h4>

          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='occupation'>
              Ocupation
            </label>
            <input
              id='occupation'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Ocupation'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.occupation}
            />
          </div>

          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='entryDate'>
              EntryDate
            </label>
            <input
              id='entryDate'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'date'}
              placeholder='EntryDate'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.EntryDate}
            />
          </div>

          {props.touched.EntryDate && props.errors.EntryDate
            ? <div className='bg-red-100 border-l-2 borde1-red-500 text-red-700 text-xs'>
              <p>{props.errors.EntryDate}</p>
            </div>
            : null
          }

        </div>

        <div>
          <h4 className='text-sm text-gray-800 font-light mt-4'>Contact</h4>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='phones'>
              Phone
            </label>
            <input
              id='phones'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'tel'}
              placeholder='Phone'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.phones}
            />
            {props.touched.phones && props.errors.phones
              ? <div className='bg-red-100 border-l-21border-red-500 text-red-700 text-xs'>
                <p>{props.errors.phones}</p>
              </div>
              : null
            }
          </div>



          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='email'>
              Unique Email
            </label>
            <input
              id='email'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'Email'}
              placeholder='Email'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
          </div>
          {props.touched.email && props.errors.email
            ? <div className='bg-red-100 border-l-21border-red-500 text-red-700 text-xs'>
              <p>{props.errors.email}</p>
            </div>
            : null
          }
        </div>
        <div className='w-full'>
          <input
            type={'submit'}
            className='bg-cyan-500 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 font-thin'
            value={'Update'}
          />
        </div>

      </form>
      : <form
        className='flex-wrap items-center bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex justify-between w-full'
        onSubmit={props.handleSubmit}
      >
        <div>
          <h4 className='text-sm text-gray-800 font-light mt-4'>Who are you?</h4>
          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              id='name'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Name'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
            />
            {props.touched.name && props.errors.name
              ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-xs'>
                <p>{props.errors.name}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='lastName'>
              lastName
            </label>
            <input
              id='lastName'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='lastName'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName}
            />
            {props.touched.lastName && props.errors.lastName
              ? <div className='bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-xs'>
                <p>{props.errors.lastName}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='dateBirth'>
              dateBirth
            </label>
            <input
              id='dateBirth'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'date'}
              placeholder='dateBirth'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.dateOfBirth}
            />
            {props.touched.dateOfBirth && props.errors.dateOfBirth
              ? <div className='bg-red-100 border-l-2 bor1er-red-500 text-red-700 text-xs'>
                <p>{props.errors.dateOfBirth}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='nationality'>
              Nacionality
            </label>
            <input
              id='nacionality'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Nacionality'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.nationality}
            />
            {props.touched.nationality && props.errors.nationality
              ? <div className='bg-red-100 border-l-2 borde1-red-500 text-red-700 text-xs'>
                <p>{props.errors.nationality}</p>
              </div>
              : null
            }
          </div>
        </div>

        <div>

          <h4 className='text-sm text-gray-800 font-light mt-4'>Address</h4>

          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='city'>
              City
            </label>
            <input
              id='city'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='City'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.city}
            />
            {props.touched.city && props.errors.city
              ? <div className='bg-red-100 border-l-1 border-red-500 text-red-700 text-xs'>
                <p>{props.errors.city}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='village'>
              Village
            </label>
            <input
              id='village'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Village'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.village}
            />
            {props.touched.village && props.errors.village
              ? <div className='bg-red-100 border-l-2 b1rder-red-500 text-red-700 text-xs'>
                <p>{props.errors.village}</p>
              </div>
              : null
            }
          </div>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='description'>
              Description
            </label>
            <input
              id='description'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'text'}
              placeholder='Description'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.description}
            />
            {props.touched.description && props.errors.description
              ? <div className='bg-red-100 border-l-2 borde1-red-500 text-red-700 text-xs'>
                <p>{props.errors.description}</p>
              </div>
              : null
            }
          </div>

        </div>

        <div>
          <h4 className='text-sm text-gray-800 font-light mt-4'>Contact</h4>


          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='phones'>
              Phone
            </label>
            <input
              id='phones'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'tel'}
              placeholder='phones'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.phones}
            />
            {props.touched.phones && props.errors.phones
              ? <div className='bg-red-100 border-l-21border-red-500 text-red-700 text-xs'>
                <p>{props.errors.phones}</p>
              </div>
              : null
            }
          </div>



          <div className='p-1'>
            <label className='block text-gray-700 text-xs font-bold mb-2' htmlFor='email'>
              Unique Email
            </label>
            <input
              id='email'
              className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type={'Email'}
              placeholder='Email'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
          </div>

          {props.touched.email && props.errors.email
            ? <div className='bg-red-100 border-l-21border-red-500 text-red-700 text-xs'>
              <p>{props.errors.email}</p>
            </div>
            : null
          }
        </div>
        <div className='w-full'>
          <input
            type={'submit'}
            className='bg-cyan-500 w-full mt-1 p-2 text-white uppercas hover:bg-gray-900 font-thin'
            value={'Update'}
          />
        </div>

      </form>
  }


  return (
    <Layout>
      <div className='flex justify-center mt-5'>
        <div className='w-full w-full'>
          {message ? <FasterMessages message={message} /> : null}
          <form className='bg-white shadow-md px-2 pt-1 pb-3 mb-1'>
            <label className='bg-blue-800 py-2 px-5 inline-block text-white rounded test-sm mt-3 uppercase font-thin'>
              <input className='mr-2 ' type='checkbox' onChange={handleAcademic} />
              Academic - Profesional
            </label>
          </form>

          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={
              validSchema
            }
            onSubmit={values => handleUpdate(values)}
          >

            {props => {
              return (
                resultForm(props)
              )
            }}
          </Formik>
        </div>
      </div >
    </Layout>
  )
}

export default EditPerson;

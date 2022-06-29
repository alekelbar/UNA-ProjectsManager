import { useMutation, useQuery } from '@apollo/client'
import { ErrorMessage, useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import HandleLoading from '../components/HandleLogin';
import Layout from '../components/Layout'
import DropDownOwn from '../components/DropDownOwn';
import Mutation from '../Graphql/Mutation';
import Query from '../Graphql/Query';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { useState } from 'react';
import FasterMessages from '../components/FasterMessages';

const options = [
  { value: 'react', label: 'React' },
  { value: 'next', label: 'Next' }
]

const addReview = () => {

  const { data: data_projects } = useQuery(Query.getProjects);

  const { data: data_people } = useQuery(Query.getPeople);

  const [createReview] = useMutation(Mutation.createReview, {
    update(cache, { data: { createReview } }) {
      // acceder a la Query cache...
      const { getReviews } = cache.readQuery({ query: Query.getReviews });

      // reconstruir la cache, pero sin mutarla..
      cache.writeQuery({
        query: Query.getReviews,
        data: {
          getReviews: [...getReviews, createReview],
        }
      })
    }
  });

  const router = useRouter();

  const validate = values => {
    const errors = {};
    console.log(values)

    if (values.firtsPerson === values.secondPerson) {
      errors.firtsPerson = 'Managers are equals';
      errors.secondPerson = 'Managers are equals';
    }
    return errors;
  }

  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      report: '',
      project: '',
      firtsPerson: '',
      secondPerson: '',
      grade: ''
    },

    validationSchema: Yup.object({
      report: Yup.string().required().min(20),
      project: Yup.string().required(),
      firtsPerson: Yup.string().required(),
      secondPerson: Yup.string().required(),
      grade: Yup.number().required().positive().min(0).max(10),
    }),
    validate,
    onSubmit: async values => {
      // logica para enviar el registro....
      console.log(values)
      const {
        report,
        project,
        firtsPerson,
        secondPerson,
        grade
      } = values;

      try {
        await createReview({
          variables: {
            "input": {
              "report": report,
              "project": project,
              "managers": {
                "firstPerson": firtsPerson,
                "secondPerson": secondPerson
              },
              "grade": parseInt(grade)
            }
          }
        });

        Swal.fire('Added', 'success', 'info')
        router.push('/reviews');
      } catch (error) {
        setMessage(error.message);
      }
    }
  });

  if (!data_projects || !data_people) return <HandleLoading />

  const projects = data_projects.getProjects.map(e => {
    return {
      value: e.id,
      label: e.projectName
    }
  })

  const people = data_people.getPeople.map(e => {
    return {
      value: e.id,
      label: e.name
    }
  })

  return (
    <Layout>
      {message ? <FasterMessages message={message} /> : null}
      <div className='flex justify-center mt-5 w-full'>
        <form
          onSubmit={formik.handleSubmit}
          className='items-start flex-wrap bg-white shadow-md px-6 rounded pt-3 pb-2 mb-2 flex flex-col justify-between w-3/5' >
          {/* {// Seleccionar el proyecto...} */}
          <h2 className='pt-3 text-2xl text-gray-800 font-light mb-2 text-center w-full'>Add Review</h2>
          <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
            Project
          </label>
          <DropDownOwn
            name="project"
            options={projects}
            value={formik.values.project}
            onChange={value => formik.setFieldValue('project', value.value)}
          />

          {formik.errors.project && formik.touched.project ?
            <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
              <p>{formik.errors.project}</p>
            </div> : null}

          <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
            Managers
          </label>
          <DropDownOwn
            name="firtsPerson"
            options={people}
            value={formik.values.firtsPerson}
            onChange={value => formik.setFieldValue('firtsPerson', value.value)}
          />

          {formik.errors.firtsPerson && formik.touched.firtsPerson ?
            <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
              <p>{formik.errors.firtsPerson}</p>
            </div> : null}

          <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
            Managers
          </label>
          <DropDownOwn
            name='secondPerson'
            options={people}
            value={formik.values.secondPerson}
            onChange={value => formik.setFieldValue('secondPerson', value.value)}
          />

          {formik.errors.secondPerson && formik.touched.secondPerson ?
            <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
              <p>{formik.errors.secondPerson}</p>
            </div> : null}

          <label className='block text-gray-700 text-sm mb-2 font-bold mt-2' htmlFor='report'>
            Review
          </label>

          <textarea
            id="report"
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Review"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.report}
          />

          {formik.errors.report && formik.touched.report ?
            <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
              <p>{formik.errors.report}</p>
            </div> : null}

          <label className='block text-gray-700 text-sm mb-2 font-bold mt-2' htmlFor='grade'>
            Grade
          </label>

          <input
            id="grade"
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="grade"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.grade}
          />

          {formik.errors.grade && formik.touched.grade ?
            <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
              <p>{formik.errors.grade}</p>
            </div> : null}

          <input
            type={'submit'}
            className='bg-cyan-500 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 font-thin'
            value={'Add'}
          />
        </form>
      </div>
    </Layout>
  )
}



export default addReview

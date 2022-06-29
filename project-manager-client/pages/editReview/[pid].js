import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik'

import FasterMessages from '../../components/FasterMessages'
import DropDownOwn from '../../components/DropDownOwn'
import { useMutation, useQuery } from '@apollo/client'
import Query from '../../Graphql/Query'
import HandleLoading from '../../components/HandleLogin'
import Mutation from '../../Graphql/Mutation'
import Swal from 'sweetalert2'



const editReview = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const { query: { pid, project, firstPerson, secondPerson } } = router;
  console.log(pid, project, firstPerson, secondPerson);

  const { data: data_projects } = useQuery(Query.getProjects);

  const { data: data_people } = useQuery(Query.getPeople);

  const [updateReview] = useMutation(Mutation.updateReview, {
    update(cache, { data: { updateReview } }) {
      cache.writeQuery({
        query: Query.getReviews,
        variables: { pid },
        data: {
          getReviews: updateReview
        }
      });
    }
  });

  const { data } = useQuery(Query.getReview, {
    variables: {
      "getReviewId": pid
    }

  });

  const validationSchema = Yup.object({
    report: Yup.string().required().min(20),
    project: Yup.string().required(),
    firtsPerson: Yup.string().required(),
    secondPerson: Yup.string().required(),
    grade: Yup.number().required().positive().min(0).max(10),
  })

  if (!data) return <HandleLoading />
  console.log(data.getReview)

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

  const validate = values => {
    const errors = {};
    console.log(values)

    if (values.firtsPerson === values.secondPerson) {
      errors.firtsPerson = 'Managers are equals';
      errors.secondPerson = 'Managers are equals';
    }
    return errors;
  }

  const handleUpdate = async (values) => {
    try {

      const { report, project, firtsPerson, secondPerson, grade } = values;

      await updateReview({
        variables: {
          "updateReviewId": pid,
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
      })

      Swal.fire(
        'Updated',
        'Update successfully',
        'success'
      )

      router.push('/reviews');
    } catch (error) {
      setMessage(error);
    }
  }

  return (
    <Layout>
      <h2 className='pt-3 text-2xl text-gray-800 font-light'>Edit Review</h2>
      {message ? <FasterMessages message={message} /> : null}
      <div className='flex justify-center mt-5 w-full'>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={
            {
              project: project,
              firtsPerson: firstPerson,
              secondPerson: secondPerson,
              report: data.getReview.report,
              grade: data.getReview.grade
            }
          }
          validate={validate}
          onSubmit={values => { handleUpdate(values) }}
        >

          {props => {

            console.log(props)

            return (
              <form
                onSubmit={props.handleSubmit}
                className='items-start flex-wrap bg-white shadow-md px-6 rounded pt-3 pb-2 mb-2 flex flex-col justify-between w-3/5' >
                {/* {// Seleccionar el proyecto...} */}
                <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
                  Project
                </label>
                <DropDownOwn
                  name="project"
                  id={'project'}
                  options={projects}
                  value={props.values.project}
                  onChange={value => props.setFieldValue('project', value.value)}
                />

                {props.errors.project && props.touched.project ?
                  <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                    <p>{props.errors.project}</p>
                  </div> : null}

                <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
                  Managers
                </label>
                <DropDownOwn
                  name="firtsPerson"
                  id={'firtsPerson'}
                  options={people}
                  value={props.values.firtsPerson}
                  onChange={value => props.setFieldValue('firtsPerson', value.value)}
                />

                {
                  props.errors.firtsPerson && props.touched.firtsPerson ?
                    <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                      <p>{props.errors.firtsPerson}</p>
                    </div> : null
                }

                <label className='block text-gray-700 text-sm mb-2 font-bold mt-2'>
                  Managers
                </label>
                <DropDownOwn
                  name='secondPerson'
                  id={'secondPerson'}
                  options={people}
                  value={props.values.secondPerson}
                  onChange={value => props.setFieldValue('secondPerson', value.value)}
                />

                {props.errors.secondPerson && props.touched.secondPerson ?
                  <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                    <p>{props.errors.secondPerson}</p>
                  </div> : null}

                <label className='block text-gray-700 text-sm mb-2 font-bold mt-2' htmlFor='report'>
                  Review
                </label>

                <textarea
                  id="report"
                  className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Review"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.report}
                />

                {props.errors.report && props.touched.report ?
                  <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                    <p>{props.errors.report}</p>
                  </div> : null}

                <label className='block text-gray-700 text-sm mb-2 font-bold mt-2' htmlFor='grade'>
                  Grade
                </label>

                <input
                  id="grade"
                  className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="grade"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.grade}
                />

                {props.errors.grade && props.touched.grade ?
                  <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                    <p>{props.errors.grade}</p>
                  </div> : null}

                <input
                  type={'submit'}
                  className='bg-cyan-500 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 font-thin'
                  value={'update'}
                />
              </form>
            )
          }}

        </Formik>
      </div>
    </Layout>
  )
}

export default editReview
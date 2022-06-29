import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import Swal from 'sweetalert2';
import Mutation from '../Graphql/Mutation';
import Query from '../Graphql/Query'
import Router from 'next/router';
export const ReviewTable = ({ review }) => {

  const [deleteReview] = useMutation(Mutation.deleteReview, {
    update(cache) {
      //obtener el array de cache de las reviews 
      const { getReviews } = cache.readQuery({ query: Query.getReviews });

      // actualizar el array...
      cache.writeQuery({
        query: Query.getReviews,
        data: {
          getReviews: getReviews.filter(e => e.id !== review.id),
        }
      })
    }
  });

  // obtener la información de las personas...
  const { data } = useQuery(Query.getManagers, {
    variables: {
      "idF": review.managers.firstPerson,
      "idS": review.managers.secondPerson
    }
  });

  const { data: project } = useQuery(Query.getProject, {
    variables: {
      "getProjectId": review.project
    }
  });

  if (!data || !project) return <tr><td>Loading...</td></tr>

  const [firstPerson, secondPerson] = data.getManagers;
  const project_name = project.getProject.projectName;


  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'w-full bg-red-700 rounded text-bold text-sm py-4 px-2 text-white m-2 block',
        cancelButton: 'w-full bg-green-700 rounded text-bold text-sm py-4 px-2 text-white m-2 block'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          const { data } = await deleteReview({
            variables: {
              "deleteReviewId": review.id
            }
          });

          swalWithBootstrapButtons.fire(
            'Deleted!',
            data.deleteReview,
            'success'
          )
        } catch (error) {
          console.log(error)
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  const handleEdit = () => {
    Router.push({
      pathname: "/editReview/[id]",
      query: {
        id: review.id,
        project: review.project,
        firstPerson: review.managers.firstPerson,
        secondPerson: review.managers.secondPerson
      }
    })
  }


  return (
    <tr className='border-b-2'>
      <td className='p-3 text-xs text-center border bg-slate-200 font-bold border-2 border-black'>{project_name}</td>
      <td className='p-3 text-xs text-center border bg-slate-200 font-bold border-2 border-black'>{review.report}</td>
      <td className='p-3 text-xs text-center border bg-slate-200 font-bold border-2 border-black'>
        {firstPerson.name} {firstPerson.lastName} and {secondPerson.name} {secondPerson.lastName}
      </td>
      <td className='p-3 text-xs text-center border bg-slate-200 font-bold border-2 border-black'>{review.grade}</td>

      <td className='p-3 text-xs text-center border bg-slate-200 font-bold border-2 border-black'>
        <button
          type='button'
          className='flex justify-center items-center bg-red-800 text-sm  py-1  px-4 w-full text-white rounded text-sm border-b-2 uppercase font-bold'
          onClick={handleDelete}
        >
          Delete
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type='button'
          className='flex justify-center items-center bg-green-800 text-sm  py-1  px-4 w-full text-white rounded text-sm border-b-2 uppercase font-bold'
          onClick={handleEdit}
        >
          Edit
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </td>
    </tr >
  )
}

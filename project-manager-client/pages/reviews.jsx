import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react'
import FasterMessages from '../components/FasterMessages';
import HandleLoading from '../components/HandleLogin';
import Layout from '../components/Layout';
import { ReviewTable } from '../components/ReviewTable';
import Query from '../Graphql/Query';

const Reviews = () => {

  const { data, loading } = useQuery(Query.getReviews);

  if (loading) return <HandleLoading />;


  return (
    <Layout>
      {data.getReviews
        ? <div className="w-4/5">
          <p className="py-3">
            <Link href={'/addReview'}>
              <a className="text-lg bg-blue-800 py-2 px-5 inline-block text-white rounded mt-3 uppercase font-bold">Add review</a>
            </Link>
          </p>
          <div className="overflow-auto w-full p-3">
            <table className='w-full bg-white'>
              <thead className='w-full'>
                <tr className='border-b-2 w-full'>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>Project</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>Report</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>Managers</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>Grade</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.getReviews.map(e => (
                    <ReviewTable key={e.id} review={e} />
                  ))
                }

                {
                  data.getReviews?.length === 0 && <FasterMessages message={'No data found, add Appendix!'} />
                }
              </tbody>
            </table>
          </div>
        </div>
        : <ProtectedView />
      }
    </Layout>
  )
}

export default Reviews;
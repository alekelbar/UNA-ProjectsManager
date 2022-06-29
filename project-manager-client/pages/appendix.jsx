import Layout from '../components/Layout';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import Query from '../Graphql/Query';
import ProtectedView from '../components/ProtectedRoute';
import HandleLoading from '../components/HandleLogin';
import FasterMessages from '../components/FasterMessages';
import AppendixTable from '../components/AppendixTable';

const Appendix = () => {

  const { data: appendix, loading: loadingA } = useQuery(Query.getAppendixs);
  const { data: people, loading: loadingP } = useQuery(Query.getPeopleOnlyId);

  if (loadingA || loadingP) return <HandleLoading />;

  const data = appendix?.getAppendixs.map(a => {
    const findElement = people?.getPeople.find(e => e.id === a.owner);
    return {
      app: a,
      ownerInfo: findElement,
    }
  })

  return (
    <Layout>
      {appendix.getAppendixs
        ? <div className="w-4/5">
          <p className="py-3">
            <Link href={'/addAppendix'}>
              <a className="text-lg bg-blue-800 py-2 px-5 inline-block text-white rounded mt-3 uppercase font-bold">Add Appendix</a>
            </Link>
          </p>
          <div className="overflow-auto w-full p-3">
            <table className='w-full bg-white'>
              <thead className='w-full'>
                <tr className='border-b-2 w-full'>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>Description</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>Onwer</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'>DataUrl</th>
                  <th className='w-min text-center text-sm my-4 rounded bg-black text-white'></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(e => (
                    < AppendixTable key={e.app.id} appendix={e} />
                  ))
                }

                {
                  appendix.getAppendixs?.length === 0 && <FasterMessages message={'No data found, add Appendix!'} />
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

export default Appendix;
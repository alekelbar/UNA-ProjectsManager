import { useQuery } from "@apollo/client";
import HandleLoading from "../components/HandleLogin";
import Layout from "../components/Layout";
import Query from "../Graphql/Query";
import ProtectedView from "../components/ProtectedRoute";
import Link from "next/link";
import Person from "../components/Person";
import FasterMessages from "../components/FasterMessages";

const Home = () => {

  const { data, loading } = useQuery(Query.getPeople);

  if (loading) return <HandleLoading />;

  return (
    <>
      {data?.getPeople ?
        <Layout>

          <div className="w-4/5">
            {/* <h1 className="text-2xl text-gray-800 font-thin">People</h1> */}
            <div className="overflow-auto w-full">
              <p className="py-3">
                <Link href={'/addPerson'}>
                  <a className="text-lg bg-blue-800 py-2 px-5 inline-block text-white rounded mt-3 uppercase font-bold">Add person</a>
                </Link>
              </p>
              <table className="table-auto w-full mt-5 sm:w-auto lg:w-full">
                <thead className="border-b-2 border-t-2">
                  <tr>
                    <th className="p-5 text-center font-semibold text-xl bg-black text-white rounded">People List</th>
                  </tr>
                </thead>

                <tbody className="">
                  {
                    data?.getPeople.map(p => (
                      <Person key={p.id} person={p} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          {data?.getPeople?.length === 0 ? <FasterMessages message={'No data found, please add People'} /> : null}
        </Layout > : <ProtectedView />
      }
    </ >
  );
}

export default Home;
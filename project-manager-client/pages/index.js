import { useQuery } from "@apollo/client";
import HandleLoading from "../components/HandleLogin";
import Layout from "../components/Layout";
import Query from "../Graphql/Query";
import ProtectedView from "../components/ProtectedRoute";
import Link from "next/link";
import Person from "../components/Person";
import PersonHeaders from "../components/PersonHeaders";
import FasterMessages from "../components/FasterMessages";

const Home = () => {

  const { data, loading } = useQuery(Query.getPeople);

  const columns = ['Name', 'lastName', 'status', 'Email', 'Professional', 'City', 'Phone', 'Address', 'Description', 'Delete'];

  if (loading) return <HandleLoading />;

  return (
    <>
      {data?.getPeople ?
        <Layout>

          <div className="w-full">
            <h1 className="text-2xl text-gray-800 font-thin">People</h1>
            <Link href={'/addPerson'}>
              <a className="bg-blue-800 py-2 px-5 inline-block text-white rounded test-sm hover:bg-gray-800 mt-3 uppercase font-bold">Add person</a>
            </Link>
            <table className="table-auto w-full shadow-md mt-10 w-lg text-sm text-thin">
              <thead className="text-start">
                <PersonHeaders colums={columns} />
              </thead>

              <tbody className="bg-white">
                {data?.getPeople.map(p => (
                  <Person key={p.id} person={p} />
                ))}
              </tbody>
            </table>

            {data.lenght === 0 ? <FasterMessages message={'No Data found'} /> : null}
          </div>
        </Layout > : <ProtectedView />}
    </ >
  );
}

export default Home;
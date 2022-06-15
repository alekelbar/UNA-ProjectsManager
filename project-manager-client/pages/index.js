import { useQuery } from "@apollo/client";
import HandleLoading from "../components/HandleLogin";
import Layout from "../components/Layout";
import Query from "../Graphql/Query";
import ProtectedView from "../components/ProtectedRoute";

const Home = () => {

  const { data, loading } = useQuery(Query.GetPeople);

  if (loading) return <HandleLoading />;

  return (
    <>
      {data?.getPeople ?
        <Layout>

          <div className="w-full">
            <h1 className="text-2xl text-gray-800 font-thin">People</h1>
            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead>
                <tr>
                  <th className="w-1/5 py-2">Name</th>
                  <th className="w-1/5 py-2">Lastname</th>
                  <th className="w-1/5 py-2">Roles</th>
                  <th className="w-1/5 py-2">Email</th>
                  <th className="w-1/5 py-2">Profesional</th>
                  <th className="w-1/5 py-2">Nationality</th>
                  <th className="w-1/5 py-2">Phones</th>
                  <th className="w-1/5 py-2">City</th>
                  <th className="w-1/5 py-2">Address</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data?.getPeople.map(p => (
                  <tr key={p.id}>
                    <td className="border px-4 py-2">
                      {p.name}
                    </td>
                    <td className="border px-4 py-2">
                      {p.lastName}
                    </td>
                    <td className="border px-4 py-2">
                      {p.role.map(e => e)}
                    </td>
                    <td className="border px-4 py-2">
                      {p.contact.email}
                    </td>

                    {p.professional ? <td className="border px-4 py-2"></td> : <td className="border px-4 py-2">NOT</td>}

                    <td className="border px-4 py-2">
                      {p.nationality}
                    </td>

                    <td className="border px-4 py-2">
                      {p.contact.phones.map(e => e + ' ')}
                    </td>

                    <td className="border px-4 py-2">
                      {p.address.city}
                    </td>

                    <td className="border px-4 py-2">
                      {p.address.description}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Layout > : <ProtectedView />}
    </ >
  );
}

export default Home;
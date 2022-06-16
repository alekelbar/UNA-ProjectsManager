import { useMutation } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";
import Mutation from "../Graphql/Mutation";
import Query from "../Graphql/Query";

const Person = ({ person }) => {
  const [deletePerson] = useMutation(Mutation.deletePerson, {
    update(cache) {
      //obtener una copia del objeto de cache
      const { getPeople } = cache.readQuery({ query: Query.getPeople });
      // Reescribir el cache
      cache.writeQuery({
        query: Query.getPeople,
        data: {
          getPeople: getPeople.filter((e) => e.id !== person.id),
        },
      });
    },
  });

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "w-full bg-red-700 rounded text-bold text-xl py-4 px-2 text-white m-2 block",
        cancelButton:
          "w-full bg-green-700 rounded text-bold text-xl py-4 px-2 text-white m-2 block",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure? ",
        text: "You won't be able to revert this! ",
        icon: "warning ",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await deletePerson({
              variables: {
                deletePersonId: person.id,
              },
            });
            swalWithBootstrapButtons.fire(
              "Deleted! ",
              data.deletePerson,
              "success "
            );
          } catch (error) {
            console.log(error);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled ",
            "Your imaginary file is safe :) ",
            "error "
          );
        }
      });
  };

  return (
    <tr key={person.id}>
      <td className="border-2 text-xs px-4 py-2 text-sm">{person.name}</td>
      <td className="border-2 text-xs px-4 py-2 text-sm">{person.lastName}</td>
      <td className="border-2 text-xs px-4 py-2 text-sm">
        {person.role.map((e) => e + "\n")}
      </td>
      <td className="border-2 text-xs px-4 py-2 text-sm">
        {person.contact.email}
      </td>

      {person.professional ? (
        <td className="border-2 text-xs px-4 py-2 text-sm">
          {person.professional.occupation.map((e) =>
            e ? e + " " : "unemployed"
          )}
        </td>
      ) : (
        <td className="border-2 text-xs px-4 py-2 text-sm">unemployed</td>
      )}

      <td className="border-2 text-xs px-4 py-2 text-sm">
        {person.nationality}
      </td>

      <td className="border-2 text-xs px-4 py-2 text-sm">
        {person.contact.phones.map((e) => e + " ")}
      </td>

      <td className="border-2 text-xs px-4 py-2 text-sm">
        {person.address.city}
      </td>

      <td className="border-2 text-xs px-4 py-2 text-sm">
        {person.address.description}
      </td>

      <td className="border-2 text-xs px-4 py-2 text-sm">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 text-sm px-4 w-full text-white rounded text-xs uppercase font-bold"
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
      </td>
    </tr>
  );
};

export default Person;

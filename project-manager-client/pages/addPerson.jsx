import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import Mutation from "../Graphql/Mutation";
import FasterMessages from "../components/FasterMessages";
import { useRouter } from "next/router";
import Query from "../Graphql/Query";
// import Query from "../Graphql/Query";

const addPerson = () => {
  const [createPerson] = useMutation(Mutation.createPerson, {
    update(cache, { data: { createPerson } }) {
      // obtener el resto del cache...
      const { getPeople } = cache.readQuery({ query: Query.getPeople });

      console.log("Create person", createPerson);
      console.log("get people", Query.getPeople);

      // ajustar la cache sin mutarla
      cache.writeQuery({
        query: Query.getPeople,
        data: {
          getPeople: [...getPeople, createPerson],
        },
      });
    },
  });

  const [hasOccupation, setHasOccupation] = useState(true);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleAcademic = () => {
    setHasOccupation(!hasOccupation);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      dateBirth: "",
      nacionality: "",
      city: "",
      village: "",
      description: "",
      ocupation: "",
      entryDate: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("The name is required"),
      lastName: Yup.string().required("The lastName is required"),
      dateBirth: Yup.date().required("The date of birth is required"),
      nacionality: Yup.string().required("The nacionality is required"),
      city: Yup.string().required("The city is required"),
      village: Yup.string().required("The village is required"),
      description: Yup.string().required("The description is required"),
      phone: Yup.string().required("The phone is required"),
      email: Yup.string().email().required("The email is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const {
        name,
        lastName,
        nacionality,
        city,
        village,
        description,
        phone,
        email,
        dateBirth,
        ocupation,
        entryDate,
      } = values;
      try {
        await createPerson({
          variables: {
            input: {
              role: [hasOccupation ? "ACADEMIC" : "STUDENT"],
              name: name,
              lastName: lastName,
              nationality: nacionality,
              address: {
                city: city,
                village: village,
                description: description,
              },
              professional: {
                occupation: hasOccupation ? ocupation : "",
                EntryDate: hasOccupation ? entryDate : "",
              },
              contact: {
                phones: [phone],
                email: email,
              },
              dateOfBirth: dateBirth,
            },
          },
        });
        router.push("/");
      } catch (error) {
        setMessage(error.message);
        console.log(error.message);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Person</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full w-full">
          <form
            className="bg-white shadow-md px-2 pt-1 pb-3 mb-1"
            onSubmit={formik.handleSubmit}
          >
            <label className="bg-blue-800 py-2 px-5 inline-block text-white rounded test-sm mt-3 uppercase font-thin">
              <input
                className="mr-2 "
                type="checkbox"
                onChange={handleAcademic}
              />
              Academic - Profesional
            </label>
          </form>

          {message ? <FasterMessages message={message} /> : null}

          {hasOccupation ? (
            <form
              className="items-center flex-wrap bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex justify-between w-full"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Who are you?
                </h4>
                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="bg-red-100 border-l-1 border-red-500 text-red-700 text-sm">
                      <p>{formik.errors.name}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    lastName
                  </label>
                  <input
                    id="lastName"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                      <p>{formik.errors.lastName}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dateBirth"
                  >
                    dateBirth
                  </label>
                  <input
                    id="dateBirth"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"date"}
                    placeholder="dateBirth"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateBirth}
                  />

                  {formik.touched.dateBirth && formik.errors.dateBirth ? (
                    <div className="bg-red-100 border-l-2 bor1er-red-500 text-red-700 text-sm">
                      <p>{formik.errors.dateBirth}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nacionality"
                  >
                    Nacionality
                  </label>
                  <input
                    id="nacionality"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Nacionality"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nacionality}
                  />
                  {formik.touched.nacionality && formik.errors.nacionality ? (
                    <div className="bg-red-100 border-l-2 borde1-red-500 text-red-700 text-sm">
                      <p>{formik.errors.nacionality}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Address
                </h4>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="City"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="bg-red-100 border-l-1 border-red-500 text-red-700 text-sm">
                      <p>{formik.errors.city}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="village"
                  >
                    Village
                  </label>
                  <input
                    id="village"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Village"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.village}
                  />
                  {formik.touched.village && formik.errors.village ? (
                    <div className="bg-red-100 border-l-2 b1rder-red-500 text-red-700 text-sm">
                      <p>{formik.errors.village}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </div>
                {formik.touched.description && formik.errors.description ? (
                  <div className="bg-red-100 border-l-2 borde1-red-500 text-red-700 text-sm">
                    <p>{formik.errors.description}</p>
                  </div>
                ) : null}
              </div>
              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Profesional
                </h4>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="ocupation"
                  >
                    Ocupation
                  </label>
                  <input
                    id="ocupation"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Ocupation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ocupation}
                  />
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="entryDate"
                  >
                    EntryDate
                  </label>
                  <input
                    id="entryDate"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"date"}
                    placeholder="EntryDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.entryDate}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Contact
                </h4>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"tel"}
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="bg-red-100 border-l-21border-red-500 text-red-700 text-sm">
                      <p>{formik.errors.phone}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Unique Email
                  </label>
                  <input
                    id="email"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"Email"}
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="bg-red-100 border-l-21border-red-500 text-red-700 text-sm">
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type={"submit"}
                  className="bg-cyan-500 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 font-thin"
                  value={"Log In"}
                />
              </div>
            </form>
          ) : (
            <form
              className="flex-wrap items-center bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex justify-between w-full"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Who are you?
                </h4>
                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="bg-red-100 border-l-1 border-red-500 text-red-700 text-sm">
                      <p>{formik.errors.name}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    lastName
                  </label>
                  <input
                    id="lastName"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="bg-red-100 border-l-2 bo1der-red-500 text-red-700 text-sm">
                      <p>{formik.errors.lastName}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dateBirth"
                  >
                    dateBirth
                  </label>
                  <input
                    id="dateBirth"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"date"}
                    placeholder="dateBirth"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateBirth}
                  />
                  {formik.touched.dateBirth && formik.errors.dateBirth ? (
                    <div className="bg-red-100 border-l-2 bor1er-red-500 text-red-700 text-sm">
                      <p>{formik.errors.dateBirth}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nacionality"
                  >
                    Nacionality
                  </label>
                  <input
                    id="nacionality"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Nacionality"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nacionality}
                  />
                  {formik.touched.nacionality && formik.errors.nacionality ? (
                    <div className="bg-red-100 border-l-2 borde1-red-500 text-red-700 text-sm">
                      <p>{formik.errors.nacionality}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Address
                </h4>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="City"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="bg-red-100 border-l-1 border-red-500 text-red-700 text-sm">
                      <p>{formik.errors.city}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="village"
                  >
                    Village
                  </label>
                  <input
                    id="village"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Village"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.village}
                  />
                  {formik.touched.village && formik.errors.village ? (
                    <div className="bg-red-100 border-l-2 b1rder-red-500 text-red-700 text-sm">
                      <p>{formik.errors.village}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"text"}
                    placeholder="Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="bg-red-100 border-l-2 borde1-red-500 text-red-700 text-sm">
                      <p>{formik.errors.description}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <h4 className="text-xl text-gray-800 font-light mt-4">
                  Contact
                </h4>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"tel"}
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="bg-red-100 border-l-21border-red-500 text-red-700 text-sm">
                      <p>{formik.errors.phone}</p>
                    </div>
                  ) : null}
                </div>

                <div className="p-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Unique Email
                  </label>
                  <input
                    id="email"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={"Email"}
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>

                {formik.touched.email && formik.errors.email ? (
                  <div className="bg-red-100 border-l-21border-red-500 text-red-700 text-sm">
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type={"submit"}
                  className="bg-cyan-500 w-full mt-1 p-2 text-white uppercas hover:bg-gray-900 font-thin"
                  value={"Log In"}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default addPerson;

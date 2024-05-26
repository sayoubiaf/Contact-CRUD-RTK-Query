import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/Contact";

const baseUrl = "http://localhost:3500/";

export const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["Contacts", "user"],
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getContacts: build.query<Contact[], void>({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    addContact: build.mutation<void, Contact>({
      query: (contact) => ({
        url: "/contacts",
        method: "Post",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    //Update
    updateContact: build.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "Put",
        body: rest,
      }),
      invalidatesTags:['Contacts']
    }),
    //delete
    deleteContact: build.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ['Contacts']
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import type { Invoice, FormInvoice } from "../types/AppDataType";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://invoice-app-bknd-strapi-cloud.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Invoice", "[]Invoice"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    fetchAllInvoices: builder.query<Invoice[], void>({
      query: () => "/invoices",
      providesTags: ["[]Invoice"],
    }),

    fetchInvoiceById: builder.query<Invoice, string>({
      query: (id: string) => `/invoices/${id}`,
      providesTags: ["Invoice"],
    }),

    updateInvoiceById: builder.mutation<Invoice, Invoice>({
      query: (invoice: Invoice) => ({
        url: `/invoices/${invoice.id}`,
        method: "PUT",
        body: { ...invoice },
      }),
      invalidatesTags: ["Invoice", "[]Invoice"],
    }),

    addInvoice: builder.mutation<Invoice, FormInvoice>({
      query: (invoice: Invoice) => ({
        url: `/invoices`,
        method: "POST",
        body: { ...invoice },
      }),
      invalidatesTags: ["[]Invoice"],
    }),

    deleteInvoice: builder.mutation<Invoice, string>({
      query: (id: string) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["[]Invoice"],
    }),
  }),
});
export const {
  useLoginMutation,
  useFetchAllInvoicesQuery,
  useFetchInvoiceByIdQuery,
  useAddInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceByIdMutation,
} = authApi;

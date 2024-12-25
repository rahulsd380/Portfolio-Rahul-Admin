import { baseApi } from "../../API/baseApi";

const myServicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["myServices"],
    }),

    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: ["myServices"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myServices"],
    }),

    addNewService: builder.mutation({
      query: (formData) => {
        return {
          url: `/services/create-service`,
          method: "POST",
          body: formData,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ["myServices"],
    }),
  }),
});

export const {
  useAddNewServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useGetSingleServiceQuery
} = myServicesApi;

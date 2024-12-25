import { baseApi } from "../../API/baseApi";

const endorsementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllEndorsements: builder.query({
      query: () => ({
        url: "/endorsements",
        method: "GET",
      }),
      providesTags: ["endorsements"],
    }),

    getSingleEndorsement: builder.query({
      query: (id) => ({
        url: `/endorsements/${id}`,
        method: "GET",
      }),
      providesTags: ["endorsements"],
    }),

    deleteEndorsement: builder.mutation({
      query: (id) => ({
        url: `/endorsements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["endorsements"],
    }),

    makeEndorsement: builder.mutation({
      query: (formData) => {
        return {
          url: `/endorsements/make-endorsement`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["endorsements"],
    }),
  }),
});

export const {
  useDeleteEndorsementMutation,
  useGetAllEndorsementsQuery,
  useGetSingleEndorsementQuery,
  useMakeEndorsementMutation
} = endorsementApi;

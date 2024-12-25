import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),

    getSingleProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),

    addNewProject: builder.mutation({
      query: (formData) => {
        console.log(formData);
        return {
          url: `/projects/create-project`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useAddNewProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
} = productApi;

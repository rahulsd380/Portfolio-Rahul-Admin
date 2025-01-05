import { baseApi } from "../../API/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),

    createBlog: builder.mutation({
      query: (formData) => {
        console.log(formData);
        return {
          url: `/blog/create`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
    useGetAllBlogsQuery,
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useGetSingleBlogQuery
} = blogApi;

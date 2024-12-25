import { baseApi } from "../../API/baseApi";

const achievementsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAchievement: builder.query({
      query: () => ({
        url: "/achievements",
        method: "GET",
      }),
      providesTags: ["achievements"],
    }),

    getSingleAchievement: builder.query({
      query: (id) => ({
        url: `/achievements/${id}`,
        method: "GET",
      }),
      providesTags: ["achievements"],
    }),

    deleteAchievement: builder.mutation({
      query: (id) => ({
        url: `/achievements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["achievements"],
    }),

    addNewAchievement: builder.mutation({
      query: (formData) => {
        return {
          url: `/achievements/add-achievement`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["achievements"],
    }),
  }),
});

export const {
  useAddNewAchievementMutation,
  useDeleteAchievementMutation,
  useGetAllAchievementQuery,
  useGetSingleAchievementQuery
} = achievementsApi;

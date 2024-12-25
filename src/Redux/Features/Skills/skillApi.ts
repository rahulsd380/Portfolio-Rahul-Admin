import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getAllSkills: builder.query({
            query : () => ({
                url : '/professional-skills',
                method : "GET",
            }),
            providesTags : ["skills"]
        }),

        getSingleSkill: builder.query({
            query : (id) => ({
                url : `/professional-skills/${id}`,
                method : "GET",
            }),
            providesTags : ["skills"]
        }),

        deleteSkill: builder.mutation({
            query : (id) => ({
                url : `/professional-skills/${id}`,
                method : "DELETE",
            }),
            invalidatesTags : ["skills"]
        }),

        addNewSkill: builder.mutation({
            query : (skillData) => ({
                url : `/professional-skills/add-skill`,
                method : "POST",
                body: skillData,
            }),
            invalidatesTags : ["skills"]
        }),
    })
})

export const { useGetAllSkillsQuery, useGetSingleSkillQuery, useAddNewSkillMutation, useDeleteSkillMutation} = productApi;
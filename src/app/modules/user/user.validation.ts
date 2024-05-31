


import {z} from 'zod'
const createUser=z.object({
   
      name: z.string({
        required_error: "name is required",
      }),
      email: z.string({
        required_error: "name is required",
      }),
      password: z.string({
        required_error: "password is required",
      }),
      bio: z.string({
        required_error: "bio is required",
      }),
      profession: z.string({
        required_error: "profession is required",
      }),
      address: z.string({
        required_error: "profession is required",
      }),
  
})






export const userValidations = {
 createUser
};

const zod = require('zod');

const userSchema = zod.object({
  name: zod.string().min(3).max(20),
  email: zod.string().email(),
  password: zod.string().min(6),
  role: zod.enum(['admin', 'user']).optional(),
});

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

// const profileSchema = zod.object({
//   userId: zod.number().int()
// });

const updateProfileSchema = zod.object({
  email: zod.string().email().optional(),
  name: zod.string().min(3).max(20).optional(),
  password: zod.string().min(6).optional(),
  bio: zod.string().max(100).optional(),
  phone: zod.string().max(10).optional(),
  photo: zod.string().optional(),
  isProfilePublic: zod.boolean().optional(),
});


module.exports = { userSchema, loginSchema, updateProfileSchema };
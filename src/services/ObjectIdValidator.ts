import mongoose from 'mongoose';

export const validateId = (id: string): boolean => {
  const result = mongoose.Types.ObjectId.isValid(id);
  return result;
};

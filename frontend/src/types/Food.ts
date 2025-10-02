export type Food = {
  _id?: string;      // p/ Mongo/Mongoose
  id?: string;       // p/ APIs que retornam "id"
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  color?: string;
  weight?: number;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface IBaseEmployee {
  age: number,
  name: string,
  role: string
}

export interface IEmployee extends IBaseEmployee {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}
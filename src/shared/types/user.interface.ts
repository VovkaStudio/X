export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
  }
}


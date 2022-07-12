export interface SignInUser {
  email: string;
  password: string;
}

export interface SignUpUser {
  email: string;
  password: string;
  name?: string;
  avatar?: File; 
}

export interface IUser {
  uid: string;
  email: string | null;
  name?: string | null;
  avatar?: string | null;
}
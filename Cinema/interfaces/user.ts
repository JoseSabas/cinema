export interface UserResponse {
  token: string;
  user: User
}

export interface User {
  id: number;
  name: string;
}
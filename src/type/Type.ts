export interface UserType {
  id: number;
  name: string;
  position?: string;
  phone?: string;
  email?: string;
  addr?: string;
  regDate: number;
}

export interface ProjectType {
  id: number;
  userId: number;
  name: string;
  description?: string;
  status: number;
  regDate: number;
  userName?: string;
}

export interface UserProps {
  id: number;
  sub: number;
  avatar_url?: string;
  picture?: string;
  bio?: string;
  name: string;
  email?: string;
  followers?: number;
  following?: number;
  location?: string;
}

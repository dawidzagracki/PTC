export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  userName: string;
  fullName: string;
  email: string;
  isEmailConfirmed: boolean;
  isOnBoarded: boolean;
}

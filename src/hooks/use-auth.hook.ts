import { useAuthStore } from "@/stores";
import { useAuthService } from "@/services";

export const useAuth = () => {
  const { authUser, authToken, CLEAR_AUTH } = useAuthStore();
  const { unauthenticateCredentials } = useAuthService();

  const checkAuth = () => {
    return authUser && authToken;
  };

  const logout = async () => {
    unauthenticateCredentials().then(() => {
      CLEAR_AUTH();
      window.location.href = "/auth/signin";
    });
  };

  return {
    userFullname: authUser?.name,
    userRole: authUser?.account_type.toUpperCase(),
    currentUserId: authUser?.id,
    checkAuth,
    logout,
  };
};

import { useQuery } from "@tanstack/vue-query";
import { getCurrentUserRole } from "./userSession";
import type { Role } from "./roles";

export function useCurrentUserRole() {
  return useQuery<Role | undefined>({
    queryKey: ["currentUserRole"],
    queryFn: getCurrentUserRole,
  });
}



export { auth as proxy } from "@/auth";

export const config = {
  // Protect all routes under /dashboard and /profile
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};

import { GET, POST } from "@/auth";

export const runtime = "nodejs"; // Optional: Force Node.js runtime if bcrypt causes issues in Edge, though standard App Router API routes are Node by default unless 'edge' is specified.
// However, auth.ts runs in both Node (api) and Edge (middleware) contexts if imported in both.
// Providing handlers here for the API route.

export { GET, POST };

const TOKEN_BYTES = 32;

function bytesToBase64Url(bytes: Uint8Array) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

export function createBookingToken() {
  const bytes = new Uint8Array(TOKEN_BYTES);
  crypto.getRandomValues(bytes);

  return bytesToBase64Url(bytes);
}

export async function hashBookingToken(token: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

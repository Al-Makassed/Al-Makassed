import axios from "./axios";

export interface VerifyAccessTokenResponse {
  jti: string; // JWT ID
  id: string; // User ID
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  profileUrl: string;
  roles: string | string[];
  exp: number; // Expiration Time
  iss: string; // Issuer
  aud: string; // Audience
}

/**
 * Verifies the access token stored in the browser's local storage by making a
 * GET request to the authentication server's endpoint.
 *
 * @returns {Promise<VerifyAccessTokenResponse>} A promise that resolves with the
 * verification response, containing user information if the token is valid.
 *
 * @throws {Error} Throws an error if the verification request fails or the token is invalid.
 */
const verifyAccessToken = () => {
  return axios
    .get<VerifyAccessTokenResponse>("/authentication/verify-bearer-token", {
      headers: {
        "access-token": localStorage.getItem("access-token"),
      },
    })
    .then((res) => res.data);
};

export default verifyAccessToken;

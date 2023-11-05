namespace Makassed.Contracts.Authentication;

public record ResetPasswordRequest( 
    string UserId,
    string CurrentPassword,
    string NewPassword
);
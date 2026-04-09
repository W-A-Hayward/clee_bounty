export const getMicrosoftUser = async (accessToken) => {
    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
        const error = new Error("Invalid Microsoft token");
        error.status = 401;
        throw error;
    }
    const data = await response.json();
    return {
        oid: data.id, // unique MS user id
        email: data.mail ?? data.userPrincipalName,
        firstName: data.givenName,
        lastName: data.surname,
        displayName: data.displayName,
        tenantId: data.tenantId ?? null,
    };
};
//# sourceMappingURL=microsoft.js.map
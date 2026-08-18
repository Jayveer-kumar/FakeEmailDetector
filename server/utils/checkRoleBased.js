function checkRoleBasedEmail(email) {
    const username = email.split("@")[0].toLowerCase();

    const roleBasedList = [
        "admin",
        "administrator",
        "support",
        "contact",
        "info",
        "sales",
        "team",
        "hello",
        "help",
        "billing",
        "career",
        "jobs",
        "marketing",
        "service",
        "security",
        "webmaster",
        "noreply",
        "no-reply",
        "donotreply"
    ];

    const isRoleBased = roleBasedList.includes(username);

    return {
        isRoleBased,
        roleReason: isRoleBased ? "role-based (non-personal) email" : "Personal Email"
    };
}

export default checkRoleBasedEmail;

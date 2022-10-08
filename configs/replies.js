const replies = {
    register: {
        registerSuccess: "You are now registered!, type rp help to see the tutorial.",
        registerFail: {
            alreadyRegistered: "You are already registered!"
        }
    }
}

export const getReplies = function() {
    return replies;
}
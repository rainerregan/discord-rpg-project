const config = {
    STARTING_SILVER: 1000,
    STARTING_XP: 0,
}

export default class UserConfig {

    static get STARTING_SILVER(){
        return config.STARTING_SILVER;
    }

    static get STARTING_XP(){
        return config.STARTING_XP
    }
}
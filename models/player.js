import { db } from '../firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import UserConfig from '../configs/userConfig.js';

export class Player {
    id = null;
    silver = null;
    xp = null;
    attack = null;
    defense = null;
    agility = null;
    health = null;
    level = null;

    constructor(id, silver, xp, attack, defense, agility, health, level) {
        this.id = id;
        this.silver = silver;
        this.xp = xp;
        this.attack = attack;
        this.defense = defense;
        this.agility = agility;
        this.health = health;
        this.level = level;
    }

    static Builder = class {

        // Default Values
        #id = null;
        #silver = UserConfig.STARTING_SILVER;
        #xp = 0;
        #attack = 50;
        #defense = 30;
        #agility = 10;
        #health = 100;
        #level = 1;
    
        setId(id) {
            this.#id = id;
            return this;
        }

        setSilver(silver) {
            this.#silver = silver;
            return this;
        }

        setXp(xp) {
            this.#xp = xp;
            return this;
        }

        setAttack(attack){
            this.#attack = attack;
            return this;
        }

        setDefense(defense){
            this.#defense = defense;
            return this;
        }

        setAgility(agility){
            this.#agility = agility;
            return this;
        }

        setHealth(health){
            this.#health = health;
            return this;
        }

        setLevel(level){
            this.#level = level;
            return this;
        }

        build(){
            const player = new Player(
                this.#id,
                this.#silver,
                this.#xp, 
                this.#attack,
                this.#defense,
                this.#agility,
                this.#health,
                this.#level
            );

            return player;
        }
    }

    toObject() {
        return {
            id: this.id,
            silver: this.silver,
            xp: this.xp,
            attack: this.attack,
            defense: this.defense,
            agility: this.agility,
            health: this.health,
            level: this.level
        }
    }

    static toClass(object) {
        const player = new Player.Builder()
            .setId(object.id)
            .setSilver(object.silver)
            .setXp(object.xp)
            .setAttack(object.attack)
            .setDefense(object.defense)
            .setAgility(object.agility)
            .setHealth(object.health)
            .setLevel(object.level)
            .build();

        return player;
    }

    /**
     * Get Player Max XP.
     * @param {Player} player 
     * @returns number
     */
    static getMaxXp = function(player){
        return player.level * (1000 + (1000 * 0.1));
    }
}

export const getPlayer = async function (id) {
    return await getDoc(doc(db, "PLAYER_DATA", id));
}

export const registerPlayer = async function (player) {
    return await setDoc(doc(db, "PLAYER_DATA", player.id), player.toObject());
}
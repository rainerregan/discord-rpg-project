import { db } from '../firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export class Player {
    id = null;
    silver = null;
    xp = null;

    constructor(id, silver, xp) {
        this.id = id;
        this.silver = silver;
        this.xp = xp;
    }

    static Builder = class {
        #id = null;
        #silver = null;
        #xp = null;

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

        build(){
            const player = new Player(
                this.#id,
                this.#silver,
                this.#xp
            );

            return player;
        }
    }

    toObject() {
        return {
            id: this.id,
            silver: this.silver,
            xp: this.xp
        }
    }

    static toClass(object) {
        const player = new Player.Builder()
            .setId(object.id)
            .setSilver(object.silver)
            .setXp(object.xp)
            .build();

        return player;
    }
}

export const getPlayer = async function (id) {
    return await getDoc(doc(db, "PLAYER_DATA", id));
}

export const registerPlayer = async function (player) {
    return await setDoc(doc(db, "PLAYER_DATA", player.id), player.toObject());
}
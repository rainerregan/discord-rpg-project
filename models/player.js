import { db } from '../firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export class Player {
    constructor(id, money) {
        this.id = id;
        this.money = money;
    }

    toObject() {
        return {
            id: this.id,
            money: this.money
        }
    }
}

export const getPlayer = async function (id) {
    return await getDoc(doc(db, "PLAYER_DATA", id));
}

export const registerPlayer = async function (player) {
    return await setDoc(doc(db, "PLAYER_DATA", player.id), player.toObject());
}
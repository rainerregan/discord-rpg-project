import { db } from '../firebase/firebase.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import UserConfig from '../configs/userConfig.js';
import { sendTextMessage } from '../services/messages.js';

export class Player {
  id = null;
  silver = null;
  xp = null;
  attack = null;
  defense = null;
  agility = null;
  health = null;
  level = null;
  world_level = null;

  constructor(id, silver, xp, attack, defense, agility, health, level, world_level) {
    this.id = id;
    this.silver = silver;
    this.xp = xp;
    this.attack = attack;
    this.defense = defense;
    this.agility = agility;
    this.health = health;
    this.level = level;
    this.world_level = world_level;
  }

  static Builder = class {

    // Default Values
    #id = null;
    #silver = UserConfig.STARTING_SILVER;
    #xp = 0;
    #attack = 10;
    #defense = 10;
    #agility = 10;
    #health = 100;
    #level = 1;
    #world_level = 1;

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

    setAttack(attack) {
      this.#attack = attack;
      return this;
    }

    setDefense(defense) {
      this.#defense = defense;
      return this;
    }

    setAgility(agility) {
      this.#agility = agility;
      return this;
    }

    setHealth(health) {
      this.#health = health;
      return this;
    }

    setLevel(level) {
      this.#level = level;
      return this;
    }

    setWorldLevel(world_level) {
      this.#world_level = world_level;
      return this;
    }

    build() {
      const player = new Player(
        this.#id,
        this.#silver,
        this.#xp,
        this.#attack,
        this.#defense,
        this.#agility,
        this.#health,
        this.#level,
        this.#world_level
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
      level: this.level,
      world_level: this.world_level
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
      .setWorldLevel(object.world_level)
      .build();

    return player;
  }

  /**
   * Get Player Max XP.
   * @param {Player} player 
   * @returns number
   */
  static getMaxXp = function (player) {
    return player.level * (100 + (100 * 0.1));
  }
}

/**
 * Get player data from id.
 * @param {string} id Player ID
 */
export const getPlayer = async function (id) {
  return await getDoc(doc(db, "PLAYER_DATA", id));
}

/**
 * Update Player Data
 * @param {string} id 
 * @param {object} updateData update data in object form
 */
export const updatePlayerData = async function (id, updateData) {
  return await updateDoc(doc(db, "PLAYER_DATA", id), updateData);
}

export const levelUp = async function (message, playerData, xpGained) {
  let currentXp = playerData.xp;
  let newXp = currentXp + xpGained;
  let currentMaxXp = Player.getMaxXp(playerData);

  let how_many = 0;
  while (newXp > currentMaxXp) {
    currentMaxXp = Player.getMaxXp(playerData);
    newXp -= currentMaxXp;

    playerData.level += 1;
    how_many += 1;
  }

  playerData.xp = newXp;

  if(how_many > 0){
    sendTextMessage(message, `Cool! 🎉You Leveled up ${how_many} time(s)`);
  }
    
  return updatePlayerData(playerData.id, {
    level: playerData.level,
    xp: playerData.xp
  })

}

/**
 * Register player
 * @param {Player} player player object
 */
export const registerPlayer = async function (player) {
  return await setDoc(doc(db, "PLAYER_DATA", player.id), player.toObject());
}
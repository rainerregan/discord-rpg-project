import { Message } from "discord.js";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { levelUp, Player, updatePlayerData } from "../models/player.js";
import { replyTextMessage } from "../services/messages.js";

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const _getAdventureEnemy = async function (worldLevel) {
  const randomNum = randomIntFromInterval(1, 2);

  return await getDocs(
    query(
      collection(db, "ENEMY_TYPE"),
      where('world_level', '==', worldLevel),
      where('random_factor', '==', randomNum),
      limit(1)
    )
  );
}

/**
 * Get random EXP for adventure
 * @param {number} level Player Level
 */
const _getRandomExp = function (level) {
  return randomIntFromInterval(
    level * (10 + (100 * 0.1)),
    level * (10 + (100 * 0.2)),
  )
}

/**
 * Send user to adventure.
 * @param {Message} message 
 * @param {Player} playerData 
 */
export const adventure = function (message, playerData) {
  _getAdventureEnemy(playerData.world_level)
    .then(snapshot => {
      snapshot.forEach((docRef) => {
        const enemyData = docRef.data();
        const enemyName = docRef.id;

        var reply = "";
        var damage = 0;

        if (playerData.health > enemyData.attack) {
          if (playerData.attack > enemyData.defense) {
            reply = `You found a wild ${enemyName}, it attacks you, you successfully killed it, you suffer minor injuries.`;
            damage = enemyData.attack + (enemyData.attack * (randomIntFromInterval(1, 2) / 10)) - playerData.defense;
          } else {
            if (playerData.agility > enemyData.agility) {
              reply = `You found a wild ${enemyName}, it attacks you, you cant killed it because it was stronger than you, you are lucky you can flee, you sufer major injuries.`;
              damage = enemyData.attack + (enemyData.attack * (randomIntFromInterval(4, 6) / 10)) - playerData.defense;
            } else {
              reply = `You found a wild ${enemyName}, it attacks you, you cant killed it because it was stronger than you, when you tried to run from it, it catched you.`;
              damage = playerData.health;
            }
          }
        } else {
          reply = `You found a wild ${enemyName}, it attacks you, you can't run from it, and it killed you.`
          damage = playerData.health;
        }

        // Damage Adjustment
        damage = damage > 0 ? damage : 1;

        // Adjust new health
        let newHealth = playerData.health - damage;
        let xpGained = _getRandomExp(playerData.level);

        // Add notes to reply
        reply += newHealth > 0 ? ` You got ${damage} damage point. You have ${newHealth} HP left. ` : ' You are dead.';
        reply += newHealth > 0 ? `You got ${xpGained} XP` : '';

        if (newHealth > 0) {
          // If still alive
          updatePlayerData(playerData.id, {
            health: newHealth
          })
            .then(() => {
              levelUp(message, playerData, xpGained)
                .then(() => {
                  replyTextMessage(message, reply);
                })
            })
        } else {
          // Reset player on its level
          let player = new Player.Builder()
            .setId(playerData.id)
            .setSilver(playerData.silver)
            .setLevel(playerData.level)
            .build();

          updatePlayerData(playerData.id, player.toObject())
            .then(() => {
              replyTextMessage(message, reply);
            })

        }



      })
    })
}
import { getPrefix } from "../configs/prefix.js";

/**
 * Command Class
 * Class for command that user send from the message.
 */
export class Command {
    constructor(command) {
        this.command = command;
        this.commandSplit = command.split(' ');
    }

    /**
     * Get full command string
     * @returns string
     */
    getFullCommand() {
        return this.command;
    }

    /**
     * Get command splitted array
     * @returns array
     */
    getCommandSplit() {
        return this.commandSplit;
    }

    /**
     * Get Command with Level
     * 
     * Get command string based on level. 
     * Each level separated by space.
     * 
     * Example: 
     * rp adventure
     * rp -> level 0
     * adventure -> level 1
     * 
     * @param {int} level 
     * @returns string
     */
    getCommandWithLevel(level = 1){
        return this.commandSplit[level];
    }

    /**
     * Get command prefix. 
     * @returns string
     */
    getCommandPrefix(){
        return this.commandSplit[0];
    }

    /**
     * Check the prefix if the command's prefix is same as the default prefix
     * @returns boolean
     */
    checkPrefix(){
        return this.getCommandPrefix() === getPrefix();
    }
}


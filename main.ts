import {Plugin, Notice} from "obsidian";

/**
 * TimeInClass - Obsidian Plugin
 * 
 * Copyright (C) 2025 ikikidev & NovaFormaLab
 * 
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * See LICENSE file for details.
 */

export default class TimeInClass extends Plugin {
  async onload() {
    console.log("TimeInClass plugin loaded");
  }

  onunload() {
    console.log("TimeInClass plugin unloaded");
  }
}

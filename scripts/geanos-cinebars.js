/**
 * Geanos CineBars Module for FoundryVTT
 * Adds cinematic black bars during combat
 */
class GeanoCineBars {
  static MODULE_ID = 'geanos-cinebars';
  static isActive = false;
  
  static init() {
    console.log(`${this.MODULE_ID} | Initializing Geanos CineBars`);
    
    // Hook für Combat Start - mehrere Varianten für bessere Kompatibilität
    Hooks.on('combatStart', (combat) => {
      console.log(`${this.MODULE_ID} | Combat started (combatStart hook)`);
      this.showBars();
    });
    
    // Alternative für Combat Start
    Hooks.on('createCombat', (combat) => {
      console.log(`${this.MODULE_ID} | Combat created`);
      // Kurz warten, dann prüfen ob Combat gestartet wurde
      setTimeout(() => {
        if (combat.started) {
          this.showBars();
        }
      }, 100);
    });
    
    // Hook für Combat End - primärer Hook
    Hooks.on('combatEnd', (combat) => {
      console.log(`${this.MODULE_ID} | Combat ended (combatEnd hook)`);
      this.hideBars();
    });
    
    // Alternative Hooks für Combat Ende (als Backup)
    Hooks.on('deleteCombat', (combat) => {
      console.log(`${this.MODULE_ID} | Combat deleted`);
      this.hideBars();
    });
    
    // Hook für Combat Updates - prüft Combat-Status-Änderungen
    Hooks.on('updateCombat', (combat, update, options, userId) => {
      console.log(`${this.MODULE_ID} | Combat updated`, { started: combat.started, round: combat.round });
      
      // Wenn Combat gerade gestartet wurde (erste Runde)
      if (combat.started && combat.round >= 1 && !this.isActive) {
        console.log(`${this.MODULE_ID} | Combat started via updateCombat`);
        this.showBars();
      }
      // Wenn Combat beendet wurde
      else if (!combat.started && this.isActive) {
        console.log(`${this.MODULE_ID} | Combat ended via updateCombat`);
        this.hideBars();
      }
    });
    
    // Zusätzlicher Check: Wenn Combat Tracker geschlossen wird
    Hooks.on('renderCombatTracker', (app, html, data) => {
      if (!game.combat || !game.combat.started) {
        this.hideBars();
      }
    });
    
    // Erstelle die HTML-Struktur beim Ready Hook
    Hooks.once('ready', () => {
      this.createBarsHTML();
      
      // Prüfe beim Laden, ob bereits ein aktiver Combat existiert
      if (game.combat && game.combat.started) {
        console.log(`${this.MODULE_ID} | Active combat detected on ready`);
        this.showBars();
      }
    });
  }
  
  static createBarsHTML() {
    // Entferne existierende Balken falls vorhanden
    document.querySelectorAll('.geano-cinebar').forEach(el => el.remove());
    
    // Erstelle oberen Balken
    const topBar = document.createElement('div');
    topBar.className = 'geano-cinebar geano-cinebar-top';
    topBar.id = 'geano-cinebar-top';
    
    // Erstelle unteren Balken
    const bottomBar = document.createElement('div');
    bottomBar.className = 'geano-cinebar geano-cinebar-bottom';
    bottomBar.id = 'geano-cinebar-bottom';
    
    // Füge zum Body hinzu
    document.body.appendChild(topBar);
    document.body.appendChild(bottomBar);
  }
  
  static showBars() {
    if (this.isActive) return;
    
    console.log(`${this.MODULE_ID} | Showing Geanos CineBars`);
    this.isActive = true;
    
    const topBar = document.getElementById('geano-cinebar-top');
    const bottomBar = document.getElementById('geano-cinebar-bottom');
    
    if (topBar && bottomBar) {
      topBar.classList.add('active');
      bottomBar.classList.add('active');
    }
  }
  
  static hideBars() {
    if (!this.isActive) return;
    
    console.log(`${this.MODULE_ID} | Hiding Geanos CineBars`);
    this.isActive = false;
    
    const topBar = document.getElementById('geano-cinebar-top');
    const bottomBar = document.getElementById('geano-cinebar-bottom');
    
    if (topBar && bottomBar) {
      topBar.classList.remove('active');
      bottomBar.classList.remove('active');
    }
  }
  
  /**
   * Manueller Toggle für Tests oder besondere Anlässe
   */
  static toggleBars() {
    if (this.isActive) {
      this.hideBars();
    } else {
      this.showBars();
    }
  }
  
  /**
   * Prüft den aktuellen Combat-Status und passt die Balken entsprechend an
   */
  static checkCombatStatus() {
    const hasActiveCombat = game.combat && game.combat.started;
    
    if (hasActiveCombat && !this.isActive) {
      this.showBars();
    } else if (!hasActiveCombat && this.isActive) {
      this.hideBars();
    }
    
    return hasActiveCombat;
  }
}

// Initialisierung des Moduls
Hooks.once('init', () => {
  GeanoCineBars.init();
});

// Globaler Zugriff für Makros
window.GeanoCineBars = GeanoCineBars;
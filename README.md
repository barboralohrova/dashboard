# 🌲 Forest Dashboard

**Komplexní životní organizér s gamifikací**

Forest Dashboard je webová PWA aplikace - interaktivní životní organizér, kde každá oblast vašeho života je reprezentována budovou v lesní vesnici "Emerald". Spolu s kawaii avatarem Lístkou (lesní víla) rostete, získáváte XP a odemykáte nová zvířátka.

## ✨ Hlavní funkce

- 🗺️ **Interaktivní mapa Emerald** - Top-down pohled na vesnici s 12 budovami
- 📋 **Úkoly & To-do** - Správa úkolů s gamifikací (denní, týdenní, jednorázové)
- ⭐ **Levelování** - Exponenciální růst XP, odemykání stvoření a dekorací
- 🔥 **Streak systém** - Denní sledování aktivity s bonusy
- 🍃 **Lístka avatar** - Kawaii lesní víla s různými emocionálními stavy
- 🌅 **Denní cyklus** - Mapa se mění podle reálného času (ráno, den, podvečer, noc)
- 📊 **Google Sheets DB** - Data uložena ve vašem Google Drive
- 📱 **PWA** - Instalovatelná aplikace na mobil i desktop

## 🎨 Design systém - Matcha Kawaii

### Barvy
- **Primary**: #7C9A6E (matcha tmavá)
- **Secondary**: #B4D4A0 (matcha světlá)
- **Accent**: #D4A574 (teplá hnědá/latte)
- **Warm**: #F2E8D0 (krémová)
- **Highlight**: #E8B4B8 (sakura růžová)
- **Background**: #F7F5F0 (teplá bílá)

### Styl
- Kawaii ilustrace, zaoblené tvary (border-radius: 1.5rem)
- Fonty: Quicksand & Nunito (Google Fonts)
- Jazyk UI: **90% čeština, 10% angličtina**

## 🚀 Tech Stack

- **React 18+** s TypeScript
- **Vite** jako build tool
- **Tailwind CSS** pro styling
- **Zustand** pro state management
- **PWA** (manifest.json + service worker)
- **Google OAuth 2.0** pro přihlášení
- **Google Sheets API** jako databáze (17 listů)
- **Google Calendar API** (čtení + zápis)
- **Google Drive API** pro soubory

## 📦 Instalace a spuštění

```bash
# Klonování
git clone https://github.com/barboralohrova/dashboard.git
cd dashboard

# Instalace závislostí
npm install

# Vývojový server
npm run dev

# Build pro produkci
npm run build

# Preview buildu
npm run preview
```

## 🔧 Konfigurace

- **Google OAuth Client ID**: `365489384585-cdh01hr4lu5m1d98s3js94cpo7lovttv.apps.googleusercontent.com`
- **Default Spreadsheet ID**: `1xaF3Rso85FmDwgEOqdsduOTJdUUfNEFjh2QW0Ykq24g`
- **GitHub Pages URL**: `https://barboralohrova.github.io/dashboard/`
- **OAuth callback**: 
  - Production: `https://barboralohrova.github.io/dashboard/callback`
  - Development: `http://localhost:5173/callback`

## 🎮 Gamifikace

### XP Levelování
Exponenciální růst s multiplikátorem **×1.2**:
- Level 1→2: 100 XP
- Level 5→6: 207 XP
- Level 10→11: 516 XP
- Level 20→21: 3,196 XP
- Level 50→51: 759,064 XP

### XP zdroje - Úkoly
| Složitost | XP |
|-----------|-----|
| 🟢 Snadný | +5 XP |
| 🔵 Střední | +15 XP |
| 🟡 Náročný | +30 XP |
| 🔴 Epický | +60 XP |
| 💎 Legendární | +120 XP |

**Bonusy:**
- Splněno před deadlinem: +5 XP
- Splněno po deadlinu: −50% XP
- Perfektní den (vše splněno): +25 XP
- Perfektní týden: +100 XP

### Streak systém
- Každý den s alespoň 1 splněným úkolem/návykem = streak pokračuje
- 1 den nečinnosti: streak se zachovává, Lístka je "ospalá" 😴
- 2+ dní nečinnosti: streak reset, Lístka je "smutná" 😢
- Návrat po pauze: +30 XP bonus

**Streak milestones:**
- 3 dny: +15 XP
- 7 dní: +40 XP
- 14 dní: +80 XP
- 30 dní: +200 XP
- 60 dní: +400 XP
- 100 dní: +1000 XP
- 365 dní: +5000 XP

### Odemykání
Zvířátka a dekorace se odemykají s úrovněmi:
- Level 3: 🐰 Králíček
- Level 5: 🌸 Květiny
- Level 10: 🌿 Lístka plná verze
- Level 15: 🦔 Ježek
- Level 20: 🦊 Lišák
- Level 30: 💧 Rybníček
- Level 50: 🦌 Srnka + ✨ magické efekty
- Level 70: 🦄 Jednorožec
- Level 100: 🐉 Lesní drak

## 🗺️ Mapa vesnice Emerald

**12 budov (všechny přístupné od Level 1):**

| Budova | Modul | Popis |
|--------|-------|-------|
| 📋 Nástěnka u studny | Úkoly | Správa úkolů a to-do listů |
| 📅 Rozhledna | Kalendář | Google Calendar integrace |
| 💰 Strom moudrosti | Finance | Správa financí a rozpočtu |
| 🍳 Kuchyňka | Jídlo | Recepty a jídelníčky |
| 📝 Tajný deníček | Deník | Osobní deník a poznámky |
| 🏋️ Tréninková loučka | Návyky | Sledování denních návyků |
| ⛰️ Jeskyně poznání | Učení | VŠ/vzdělávání, předměty |
| 🏡 Chaloupka | Domácnost | Domácí práce a údržba |
| 🌸 Bylinkářka | Zdraví | Zdraví a wellness |
| 👥 Poštovní budka | Vztahy | Kontakty a vztahy |
| 🛡️ Strážní věž | Pojištění | Správa pojištění |
| 🧳 Cestovatelský kůl | Cestování | Plánování cest |

## 📊 Google Sheets struktura

Aplikace automaticky vytvoří 17 listů ve vašem Google Sheets:

1. `nastaveni` - Konfigurace
2. `gamifikace` - Level, XP, streak
3. `xp_log` - Historie XP
4. `ukoly` - Úkoly a to-do
5. `navyky` - Návyky
6. `navyky_log` - Historie návyků
7. `kalendar_cache` - Cache událostí
8. `poznamky` - Poznámky
9. `soubory` - Soubory z Drive
10. `predmety` - VŠ předměty
11-17. `finance`, `jidlo`, `denik`, `zdravi`, `pojisteni`, `vztahy`, `cestovani`

## 🎯 Roadmap

### Fáze 1 ✅ (Implementováno)
- [x] Projekt setup (Vite, React, TypeScript, Tailwind)
- [x] Google OAuth 2.0 přihlášení
- [x] Google Sheets service
- [x] Gamifikační engine (XP, level, streak)
- [x] Mapa Emerald s denním cyklem
- [x] Modul: Úkoly & To-do
- [x] Dashboard homepage
- [x] Responzivní layout
- [x] PWA konfigurace

### Fáze 2 (Plánováno)
- [ ] Google Calendar integrace
- [ ] Modul: Návyky
- [ ] Modul: Finance
- [ ] Modul: Jídlo
- [ ] Modul: Deník
- [ ] Animace Lístky a zvířátek
- [ ] Sound effects (volitelné)
- [ ] Pokročilé statistiky

## 📱 Instalace jako PWA

1. Otevřete aplikaci v prohlížeči
2. V Chrome/Edge: Klikněte na ikonu instalace v adresním řádku
3. Na mobilu: "Přidat na plochu"

## 🤝 Přispívání

Projekt je ve vývoji. Pull requesty jsou vítány!

## 📄 Licence

Private project © 2026 Barbora Lohrová

## 👩‍💻 Autorka

**Barbora Lohrová**
- GitHub: [@barboralohrova](https://github.com/barboralohrova)

---

Made with 💚 and 🌿 in Czech Republic

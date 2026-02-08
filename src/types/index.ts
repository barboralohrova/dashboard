export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  spreadsheetId: string | null;
  isAuthenticated: boolean;
}

export interface Task {
  id: string;
  nazev: string;
  popis?: string;
  kategorie: string;
  slozitost: TaskComplexity;
  stav: TaskStatus;
  datum_vytvoreni: string;
  datum_splneni?: string;
  datum_deadline?: string;
  opakovani: TaskRepeat;
  modul: string;
  xp_udeleno?: number;
}

export type TaskComplexity = 'snadny' | 'stredni' | 'narocny' | 'epicky' | 'legendarni';
export type TaskStatus = 'aktivni' | 'splneno' | 'zruseno';
export type TaskRepeat = 'jednorázový' | 'denní' | 'týdenní';

export interface TaskFilter {
  type: 'vse' | 'denni' | 'tydeni' | 'jednorazove';
  sort: 'deadline' | 'slozitost' | 'modul';
  showCompleted: boolean;
}

export interface GameState {
  id: string;
  level: number;
  xp: number;
  xp_celkem: number;
  streak_aktualni: number;
  streak_nejdelsi: number;
  posledni_aktivita: string;
  odemnuta_stvoreni: string[];
  odemnute_dekorace: string[];
}

export type ListkaState = 'happy' | 'sleepy' | 'sad' | 'excited' | 'shining' | 'determined';

export interface XPLog {
  id: string;
  datum: string;
  zdroj: string;
  zdroj_id?: string;
  xp_hodnota: number;
  popis: string;
}

export interface Navyk {
  id: string;
  nazev: string;
  ikona: string;
  frekvence: 'denni' | 'tydeni';
  cilova_hodnota: number;
  jednotka: string;
  obtiznost: 'easy' | 'medium' | 'hard';
  aktivni: boolean;
  datum_vytvoreni: string;
}

export interface NavykLog {
  id: string;
  navyk_id: string;
  datum: string;
  hodnota: number;
  splneno: boolean;
  xp_udeleno?: number;
}

export interface CalendarEvent {
  id: string;
  nazev: string;
  datum_zacatek: string;
  datum_konec: string;
  cely_den: boolean;
  lokace?: string;
  popis?: string;
  barva?: string;
  pripominka_min?: number;
  propojeny_ukol_id?: string;
  zdroj: 'google' | 'manual';
  posledni_sync?: string;
}

export interface Note {
  id: string;
  nazev: string;
  obsah: string;
  modul?: string;
  predmet_id?: string;
  tagy: string[];
  vytvoreno: string;
  upraveno: string;
}

export interface File {
  id: string;
  nazev: string;
  drive_file_id: string;
  drive_link: string;
  mime_type: string;
  velikost_bytes: number;
  slozka?: string;
  modul?: string;
  predmet_id?: string;
  nahrano: string;
  tagy: string[];
}

export interface Predmet {
  id: string;
  nazev: string;
  kod: string;
  ikona?: string;
  semestr: string;
  kredity: number;
  vyucujici?: string;
  hodnoceni?: string;
  stav: 'aktivni' | 'ukoncen' | 'neukoncen';
  poznamka?: string;
}

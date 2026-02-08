const DEFAULT_SPREADSHEET_ID = '1xaF3Rso85FmDwgEOqdsduOTJdUUfNEFjh2QW0Ykq24g';

// Definice 17 listů
const SHEETS = [
  { name: 'nastaveni', headers: ['klic', 'hodnota'] },
  { name: 'gamifikace', headers: ['id', 'level', 'xp', 'xp_celkem', 'streak_aktualni', 'streak_nejdelsi', 'posledni_aktivita', 'odemnuta_stvoreni', 'odemnute_dekorace'] },
  { name: 'xp_log', headers: ['id', 'datum', 'zdroj', 'zdroj_id', 'xp_hodnota', 'popis'] },
  { name: 'ukoly', headers: ['id', 'nazev', 'popis', 'kategorie', 'slozitost', 'stav', 'datum_vytvoreni', 'datum_splneni', 'datum_deadline', 'opakovani', 'modul', 'xp_udeleno'] },
  { name: 'navyky', headers: ['id', 'nazev', 'ikona', 'frekvence', 'cilova_hodnota', 'jednotka', 'obtiznost', 'aktivni', 'datum_vytvoreni'] },
  { name: 'navyky_log', headers: ['id', 'navyk_id', 'datum', 'hodnota', 'splneno', 'xp_udeleno'] },
  { name: 'kalendar_cache', headers: ['id', 'nazev', 'datum_zacatek', 'datum_konec', 'cely_den', 'lokace', 'popis', 'barva', 'pripominka_min', 'propojeny_ukol_id', 'zdroj', 'posledni_sync'] },
  { name: 'poznamky', headers: ['id', 'nazev', 'obsah', 'modul', 'predmet_id', 'tagy', 'vytvoreno', 'upraveno'] },
  { name: 'soubory', headers: ['id', 'nazev', 'drive_file_id', 'drive_link', 'mime_type', 'velikost_bytes', 'slozka', 'modul', 'predmet_id', 'nahrano', 'tagy'] },
  { name: 'predmety', headers: ['id', 'nazev', 'kod', 'ikona', 'semestr', 'kredity', 'vyucujici', 'hodnoceni', 'stav', 'poznamka'] },
  { name: 'finance', headers: ['id', 'typ', 'castka', 'kategorie', 'popis', 'datum', 'opakovani', 'vytvoreno'] },
  { name: 'jidlo', headers: ['id', 'nazev', 'typ_jidla', 'ingredience', 'postup', 'cas_pripravy', 'porce', 'oblibene', 'tagy', 'datum_pridani'] },
  { name: 'denik', headers: ['id', 'nazev', 'obsah', 'nalada', 'datum', 'tagy', 'vytvoreno', 'upraveno'] },
  { name: 'zdravi', headers: ['id', 'placeholder'] },
  { name: 'pojisteni', headers: ['id', 'placeholder'] },
  { name: 'vztahy', headers: ['id', 'placeholder'] },
  { name: 'cestovani', headers: ['id', 'placeholder'] },
];

/**
 * Inicializuje spreadsheet s všemi 17 listy
 */
export async function initializeSpreadsheet(accessToken: string, spreadsheetId?: string): Promise<string> {
  const id = spreadsheetId || DEFAULT_SPREADSHEET_ID;
  
  try {
    // Zkontrolovat, zda spreadsheet existuje
    const checkResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!checkResponse.ok) {
      throw new Error('Spreadsheet not found');
    }
    
    const spreadsheet = await checkResponse.json();
    const existingSheets = spreadsheet.sheets.map((s: any) => s.properties.title);
    
    // Vytvořit chybějící listy
    const requests = [];
    for (const sheet of SHEETS) {
      if (!existingSheets.includes(sheet.name)) {
        requests.push({
          addSheet: {
            properties: {
              title: sheet.name,
            },
          },
        });
      }
    }
    
    if (requests.length > 0) {
      const batchResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${id}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests }),
        }
      );
      
      if (!batchResponse.ok) {
        const errorBody = await batchResponse.text();
        throw new Error(`Failed to add sheets: ${batchResponse.status} ${errorBody}`);
      }
    }
    
    // Inicializovat hlavičky pro všechny listy
    const headerUpdates = SHEETS.map((sheet) => ({
      range: `${sheet.name}!A1`,
      values: [sheet.headers],
    }));
    
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}/values:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valueInputOption: 'RAW',
          data: headerUpdates,
        }),
      }
    );
    
    // Inicializovat výchozí gamifikaci pouze pokud list je prázdný
    try {
      const gamifikaceData = await readFromSheet(accessToken, id, 'gamifikace');
      if (gamifikaceData.length === 0) {
        await writeToSheet(accessToken, id, 'gamifikace', [
          ['user_001', '1', '0', '0', '0', '0', new Date().toISOString(), '', ''],
        ]);
      }
    } catch {
      // If reading fails (empty sheet), write defaults
      await writeToSheet(accessToken, id, 'gamifikace', [
        ['user_001', '1', '0', '0', '0', '0', new Date().toISOString(), '', ''],
      ]);
    }
    
    return id;
  } catch (error) {
    console.error('Failed to initialize spreadsheet:', error);
    throw error;
  }
}

/**
 * Čte data z listu
 */
export async function readFromSheet<T = any[]>(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  range?: string
): Promise<T[]> {
  const fullRange = range ? `${sheetName}!${range}` : `${sheetName}`;
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(fullRange)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to read from sheet: ${response.status} ${errorBody}`);
  }
  
  const data = await response.json();
  const rows = data.values || [];
  
  if (rows.length === 0) {
    return [];
  }
  
  // První řádek jsou hlavičky
  const headers = rows[0];
  const results: any[] = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj: any = {};
    headers.forEach((header: string, index: number) => {
      obj[header] = row[index] || '';
    });
    results.push(obj);
  }
  
  return results as T[];
}

/**
 * Zapisuje data do listu
 */
export async function writeToSheet(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  values: any[][],
  range?: string
): Promise<void> {
  const fullRange = range ? `${sheetName}!${range}` : `${sheetName}!A2`;
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(fullRange)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
        majorDimension: 'ROWS',
      }),
    }
  );
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to write to sheet: ${response.status} ${errorBody}`);
  }
}

/**
 * Přidá nový řádek do listu
 */
export async function appendToSheet(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  values: any[]
): Promise<void> {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [values],
      }),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to append to sheet: ${response.statusText}`);
  }
}

/**
 * Aktualizuje konkrétní řádek v listu
 */
export async function updateSheetRow(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  rowIndex: number,
  values: any[]
): Promise<void> {
  const range = `${sheetName}!A${rowIndex}`;
  await writeToSheet(accessToken, spreadsheetId, sheetName, [values], range);
}

/**
 * Načte všechna data při startu aplikace (batch read)
 */
export async function batchReadAllData(
  accessToken: string,
  spreadsheetId: string
): Promise<Record<string, any[]>> {
  const ranges = SHEETS.map((sheet) => sheet.name);
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${ranges.map((r) => `ranges=${encodeURIComponent(r)}`).join('&')}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to batch read: ${response.statusText}`);
  }
  
  const data = await response.json();
  const result: Record<string, any[]> = {};
  
  data.valueRanges.forEach((valueRange: any, index: number) => {
    const sheetName = SHEETS[index].name;
    const rows = valueRange.values || [];
    
    if (rows.length > 1) {
      const headers = rows[0];
      const parsedRows = [];
      
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const obj: any = {};
        headers.forEach((header: string, colIndex: number) => {
          obj[header] = row[colIndex] || '';
        });
        parsedRows.push(obj);
      }
      
      result[sheetName] = parsedRows;
    } else {
      result[sheetName] = [];
    }
  });
  
  return result;
}

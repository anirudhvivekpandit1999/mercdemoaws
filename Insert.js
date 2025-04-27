const xlsx = require('xlsx');
const fs = require('fs');

// Path to your Excel file
const excelFilePath = 'DB1-1.xlsx';

function generateInsertStatements() {
  try {
    // Read the Excel file
    console.log(`Reading Excel file: ${excelFilePath}`);
    const workbook = xlsx.readFile(excelFilePath, { cellDates: true });

    // Use the specific sheet name "Tripping Data"
    const sheetName = "Tripping Data";
    console.log(`Using sheet: ${sheetName}`);
    const sheet = workbook.Sheets[sheetName];

    // Get the range of the sheet
    const range = xlsx.utils.decode_range(sheet['!ref']);
    console.log(`Sheet range: ${sheet['!ref']}`);

    // Create an array to store all INSERT statements
    const insertStatements = [];

    // Loop through each row starting from the data row (e.g., row 11 in your case)
    for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
      // Read each column value based on its index
      const row = {
        plantName: getCellValue(sheet, rowNum, 2), // Column C (index 2)
        unit: getCellValue(sheet, rowNum, 3),     // Column D (index 3)
        nature: getCellValue(sheet, rowNum, 4),   // Column E (index 4)
        tripType: getCellValue(sheet, rowNum, 5), // Column F (index 5)
        trippingDate: getCellValue(sheet, rowNum, 6), // Column G (index 6)
        trippingTime: getCellValue(sheet, rowNum, 7), // Column H (index 7)
        syncDate: getCellValue(sheet, rowNum, 8),     // Column I (index 8)
        syncTime: getCellValue(sheet, rowNum, 9),     // Column J (index 9)
        hour: getCellValue(sheet, rowNum, 10),        // Column K (index 10)
        generationLoss: getCellValue(sheet, rowNum, 11), // Column L (index 11)
        boilerLightupDate: getCellValue(sheet, rowNum, 12), // Column M (index 12)
        boilerLightupTime: getCellValue(sheet, rowNum, 13), // Column N (index 13)
        reason: getCellValue(sheet, rowNum, 14),      // Column O (index 14)
        startupType: getCellValue(sheet, rowNum, 15), // Column P (index 15)
        foDuringStartup: getCellValue(sheet, rowNum, 16), // Column Q (index 16)
        ldoDuringStartup: getCellValue(sheet, rowNum, 17), // Column R (index 17)
        totOilDuringStartup: getCellValue(sheet, rowNum, 18), // Column S (index 18)
        tripCount: getCellValue(sheet, rowNum, 19),   // Column T (index 19)
        blrLtupToSyncHrs: getCellValue(sheet, rowNum, 20), // Column U (index 20)
        remarks: getCellValue(sheet, rowNum, 21),     // Column V (index 21)
        plant: getCellValue(sheet, rowNum, 22),       // Column W (index 22)
        expectedSyncDate: getCellValue(sheet, rowNum, 23), // Column X (index 23)
        expectedBlrLightupDate: getCellValue(sheet, rowNum, 24), // Column Y (index 24)
      };

      // Skip rows where the plant name is missing
      if (!row.plantName) {
        continue;
      }

      // Create SQL INSERT statement
      const insertStatement = `INSERT INTO Tripping_Data (
        PlantName, 
        Unit, 
        Nature, 
        TripType, 
        TrippingDate,
        SynchronizationDate,
        Hour,
        GenerationLoss,
        BoilerLightupDate,
        Reason,
        StartupType,
        FODuringStartup,
        LDODuringStartup,
        TOTOilDuringStartup,
        TripCount,
        BLRLTUPToSyncHRS,
        Remarks,
        Plant,
        ExpectedSyncDate,
        ExpectedBlrLightupDate
      ) VALUES (
        ${formatString(row.plantName)},
        ${formatString(row.unit)},
        ${formatString(row.nature)},
        ${formatString(row.tripType)},
        ${formatDateTime(row.trippingDate, row.trippingTime)},
        ${formatDateTime(row.syncDate, row.syncTime)},
        ${formatNumber(row.hour)},
        ${formatNumber(row.generationLoss)},
        ${formatDateTime(row.boilerLightupDate, row.boilerLightupTime)},
        ${formatString(row.reason)},
        ${formatString(row.startupType)},
        ${formatNumber(row.foDuringStartup)},
        ${formatNumber(row.ldoDuringStartup)},
        ${formatNumber(row.totOilDuringStartup)},
        ${formatNumber(row.tripCount)},
        ${formatNumber(row.blrLtupToSyncHrs)},
        ${formatString(row.remarks)},
        ${formatString(row.plant)},
        ${formatDateTime(row.expectedSyncDate)},
        ${formatDateTime(row.expectedBlrLightupDate)}
      );`;

      insertStatements.push(insertStatement);
    }

    // Write all INSERT statements to a SQL file
    fs.writeFileSync('tripping_data_inserts.sql', insertStatements.join('\n\n'));

    console.log(`Generated ${insertStatements.length} INSERT statements. Saved to tripping_data_inserts.sql`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Helper functions
function getCellValue(sheet, row, col) {
  const cell = sheet[xlsx.utils.encode_cell({ r: row, c: col })];
  return cell ? cell.v : null;
}

function formatDateTime(dateVal, timeVal) {
  if (!dateVal) return 'NULL';

  try {
    let dateStr = dateVal;
    if (typeof dateVal === 'object' && dateVal instanceof Date) {
      const day = dateVal.getDate().toString().padStart(2, '0');
      const month = (dateVal.getMonth() + 1).toString().padStart(2, '0');
      const year = dateVal.getFullYear();
      dateStr = `${day}.${month}.${year}`;
    }

    const [day, month, year] = dateStr.toString().split('.');
    let hours = '00', minutes = '00', seconds = '00';
    if (timeVal) {
      const timeParts = timeVal.toString().split(':');
      hours = (timeParts[0] || '00').padStart(2, '0');
      minutes = (timeParts[1] || '00').padStart(2, '0');
      seconds = (timeParts[2] || '00').padStart(2, '0');
    }

    return `'${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hours}:${minutes}:${seconds}'`;
  } catch (error) {
    return 'NULL';
  }
}

function formatString(val) {
  if (val === undefined || val === null || val === '') return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function formatNumber(val) {
  if (val === undefined || val === null || val === '' || isNaN(Number(val))) return 'NULL';
  return val;
}

// Run the function
generateInsertStatements();
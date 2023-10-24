// Import the xlsx library
import * as XLSX from 'xlsx';

// Function to read data from an Excel file
const readExcelFile = async (file) => {
  const reader = new FileReader();

  // Create a Promise to handle asynchronous file reading
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      // Assuming data is on the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Map the JSON data to an array of objects with key-value pairs
      const arrayOfObjects = jsonData.map((row) => {
        const obj = {};
        for (const key in row) {
          obj[key] = row[key];
        }
        return obj;
      });

      // Resolve the Promise with the array of objects
      resolve(arrayOfObjects);
    };

    reader.onerror = (error) => reject(error);

    // Read the file as binary data
    reader.readAsBinaryString(file);
  });
};


export default readExcelFile;

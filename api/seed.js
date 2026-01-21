require('dotenv').config({ path: './variables.env' });

const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Equipment = require('./models/Equipment');

const csvHeaders = [
  'nom', 'horari', 'tipus', 'municipal', 'latitud', 'longitud', 
  'localitzacio', 'telefon', 'districte', 'CODIENS', 'NOMENS'
];

const equipments = [];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Equipment.deleteMany({});
    
    const filePath = path.resolve('OpenDataTGN_equipamientos.csv');
    if (!fs.existsSync(filePath)) {
      console.error('CSV file not found:', filePath);
      process.exit(1);
    }

    return new Promise((resolve, reject) => {
      let processedCount = 0;
      
      fs.createReadStream(filePath, { encoding: 'utf8' })
        .pipe(csv({ 
          headers: csvHeaders,
          trim: true,
          rtrim: true,
          ltrim: true,
          skip_empty_lines: true,
          escape: '"',
          quoted: true,
          skip_lines_with_error: true
        }))
        .on('data', (row) => {
          processedCount++;
          if (processedCount <= 3) {
            console.log(`Row ${processedCount}: nom="${(row.nom || '').slice(0,40)}", tipus="${(row.tipus || '').slice(0,40)}"`);
          }
          
          const nom = (row.nom || '').trim();
          const tipus = (row.tipus || '').trim();
          const localitzacio = (row.localitzacio || '').trim();
          const districte = (row.districte || '').trim();
          
          if (nom || tipus || localitzacio || districte) {
            equipments.push({
              nom: nom || 'No name',
              tipus: tipus || 'Unknown',
              localitzacio: localitzacio || '',
              districte: districte || '',
              latitud: parseFloat(row.latitud) || 41.118,
              longitud: parseFloat(row.longitud) || 1.245,
              createdAt: new Date()
            });
          }
        })
        .on('end', async () => {
          
          if (equipments.length > 0) {
            await Equipment.insertMany(equipments.slice(0, 2000));
            
            const count = await Equipment.countDocuments();
          } else {
            console.log('No valid data');
          }
          
          await mongoose.connection.close();
          resolve();
        })
        .on('error', (err) => {
          console.error('CSV parsing error:', err.message);
          reject(err);
        });
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });

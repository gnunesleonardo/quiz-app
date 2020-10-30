const fs = require('fs').promises;

const saveDataToJsonDatabase = async (databaseFile, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(`./api/database/${databaseFile}`, jsonData);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = saveDataToJsonDatabase;
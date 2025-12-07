import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const infoTablePath = path.resolve('./src/assets/infotable.json');
const branchDataPath = path.resolve('./public/data/branchData.json');

app.get('/api/infotable', async (req, res) => {
  try {
    const data = await fs.readFile(infoTablePath, 'utf-8');
    const infoTable = JSON.parse(data);
    res.json(infoTable);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/infotable', async (req, res) => {
  const logs = [];
  try {
    const formData = req.body;
    logs.push(`Received formData: ${JSON.stringify(formData)}`);
    const { id: originalId, groupId, memberIndex } = formData;

    // Update infoTable.json
    const infoTableData = await fs.readFile(infoTablePath, 'utf-8');
    const infoTable = JSON.parse(infoTableData);

    const maxId = infoTable
      .filter(item => item.id < 9000)
      .reduce((max, item) => (item.id > max ? item.id : max), 0);

    const newRecord = {
      ...formData,
      id: maxId + 1,
    };
    delete newRecord.groupId;
    delete newRecord.memberIndex;

    infoTable.push(newRecord);
    await fs.writeFile(infoTablePath, JSON.stringify(infoTable, null, 2));
    logs.push('infoTable.json updated successfully.');

    // Update branchData.json
    logs.push(`Updating branchData.json: groupId=${groupId}, memberIndex=${memberIndex}, newId=${newRecord.id}`);
    const branchDataData = await fs.readFile(branchDataPath, 'utf-8');
    const branchData = JSON.parse(branchDataData);

    const groupToUpdate = branchData.find(group => group.id === groupId);
    if (groupToUpdate) {
      logs.push(`Found group to update: ${JSON.stringify(groupToUpdate)}`);
      groupToUpdate.members[memberIndex] = newRecord.id;
      logs.push(`Updated group: ${JSON.stringify(groupToUpdate)}`);
    } else {
      logs.push(`Group not found for groupId: ${groupId}`);
    }

    await fs.writeFile(branchDataPath, JSON.stringify(branchData, null, 2));
    logs.push('branchData.json updated successfully.');

    res.status(201).json({ logs });
  } catch (error) {
    logs.push(`Error saving data: ${error.toString()}`);
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Server error', logs });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

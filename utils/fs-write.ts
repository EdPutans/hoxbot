import fs from 'fs';
const fileName = 'activeStandupThreads.json';

type JSONFile = {
  activeStandupThreads: string[];
}


export function addActiveStandupThread(newThreadId: string, users: string[]) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const fileCopy: JSONFile = JSON.parse(file)

  fileCopy.activeStandupThreads.push(newThreadId)

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
    console.log(`Added active standup ID ${newThreadId}, `, { fileCopy })
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}

export function removeActiveStandupThread(threadId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  let fileCopy: JSONFile = JSON.parse(file)

  fileCopy.activeStandupThreads =
    fileCopy.activeStandupThreads.filter(id => id !== threadId);

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
    console.log('Removed active standup ID ' + threadId, { fileCopy })
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}


export function getActiveStandupThread(threadId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const parsedFile: JSONFile = JSON.parse(file)

  return parsedFile.activeStandupThreads.find(id => id === threadId);
}



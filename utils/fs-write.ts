import fs from 'fs';
const fileName = 'activeStandupThreads.json';

type JSONFile = {
  activeStandupThreads: {
    [k in string]: string[]
  }
}


export function addActiveStandupThread(newThreadId: string, users: string[]) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const fileCopy: JSONFile = JSON.parse(file)

  fileCopy.activeStandupThreads = {
    ...fileCopy.activeStandupThreads,
    [newThreadId]: users
  }

  console.log({ fileCopy })

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}

export function removeActiveStandupThread(threadId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const fileCopy: JSONFile = JSON.parse(file)

  delete fileCopy.activeStandupThreads[threadId]
  console.log({ fileCopy })

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}


export function getActiveStandupThread(threadId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const parsedFile: JSONFile = JSON.parse(file)

  return parsedFile.activeStandupThreads[threadId];
}

export function getDoesStudentNeedToReply(threadId: string, userId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const parsedFile: JSONFile = JSON.parse(file)
  // if (!getActiveStandupThread(threadId)) return false;

  const needsToReply = parsedFile.activeStandupThreads[threadId]?.includes(userId);
  console.log({ needsToReply, threadId, userId, thrds: parsedFile.activeStandupThreads })
  return needsToReply
}

export function removeStudentFromActiveStandup(threadId: string, userId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const fileCopy: JSONFile = JSON.parse(file)

  if (!getActiveStandupThread(threadId)) return;

  fileCopy.activeStandupThreads[threadId] = fileCopy.activeStandupThreads[threadId].filter(uId => uId !== userId)

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}

export function removeThread(threadId: string) {
  const file = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const fileCopy: JSONFile = JSON.parse(file)

  delete fileCopy.activeStandupThreads[threadId];

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}

console.log('file loaded')
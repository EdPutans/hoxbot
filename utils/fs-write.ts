import fs from 'fs';
const fileName = 'activeStandupThreads.json';
const file = fs.readFileSync(fileName, { encoding: 'utf-8' });

export function addActiveStandupThread(newThreadId: string) {
  const fileCopy = JSON.parse(file)

  fileCopy.activeStandupThreads = [...fileCopy.activeStandupThreads, newThreadId];
  console.log({ fileCopy })

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}

export function removeActiveStandupThread(threadId: string) {
  const fileCopy = JSON.parse(file)

  const index = fileCopy.activeStandupThreads.filter()
  fileCopy.activeStandupThreads = fileCopy.activeStandupThreads.filter((item: string) => item === threadId)
  console.log({ fileCopy })

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileCopy, null, 2), { encoding: 'utf-8' });
  } catch (err: any) {
    console.log('Error writing json:' + err?.message)
  }
}


export function getIsActiveStandupThread(threadId: string) {
  const parsedFile = JSON.parse(file)
  return parsedFile.activeStandupThreads.includes(threadId);
}
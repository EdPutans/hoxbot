type MessageWithNewLine = `${string}\n`;

type PopulateOptions = {
  cleanStart: boolean;
};

export function stringAsADatabase<T extends string[]>(
  message: string = "",
  initialTitle: string,
  renderItem: (data: T) => MessageWithNewLine,
  getItemFromString: (string: string) => T
) {
  function stripAwayEmptyLines() {
    message = message.replace(/(^[ \t]*\n)/gm, "");
  }

  function populate(items: T[], options?: PopulateOptions): string {
    const addedMessage = renderMultipleItems(items);

    if (options?.cleanStart) {
      message = initialTitle + addedMessage;
    } else {
      message = message + addedMessage;
    }
    stripAwayEmptyLines();
    return message;
  }

  function renderMultipleItems(items: T[]): string {
    return items.map(renderItem).join("");
  }

  function getAllEntries(): T[] {
    const preppedStr = message.substring(initialTitle.length);
    const splitRows = preppedStr.split("\n"); // removes the init title

    const result = splitRows
      .map((row) => getItemFromString(row))
      .filter((row) => {
        // @ts-ignore I hate that I have to do this...
        if (row.includes(undefined)) return false;
        if (row.includes("undefined")) return false;

        return true;
      });

    return result;
  }

  function getItemBy(
    indexInDataString: number,
    value: string,
    isPrecise: boolean = true
  ): T | null {
    const splitItem = getAllEntries();
    const foundItem = splitItem.find((row) => {
      if (isPrecise) {
        const exactValue = row[indexInDataString] === value;

        return exactValue;
      } else {
        const includes = row[indexInDataString]
          .toLowerCase()
          .includes(value.toLowerCase());

        return includes;
      }
    });

    if (foundItem) return foundItem;

    return null;
  }

  function addItem(newDataItem: T): string {
    const newMessagePart = renderItem(newDataItem);

    message = message + "\n" + newMessagePart;

    stripAwayEmptyLines();
    return message;
  }

  function updateItemBy(
    identifierIndexInRow: number,
    identifier: string,
    newItem: T
  ): string | null {
    const entries = getAllEntries();

    let indexToUpdate = entries.findIndex((item) => {
      const includes = item[identifierIndexInRow] === identifier;

      return includes;
    });

    console.log({ entries, identifier, identifierIndexInRow, indexToUpdate });
    if (indexToUpdate === -1) return null;
    entries[indexToUpdate] = newItem;

    message = initialTitle + renderMultipleItems(entries);
    stripAwayEmptyLines();
    return message;
  }

  function deleteItemBy(identifierIndexInRow: number, identifier: string) {
    const entries = getAllEntries();
    let indexToDelete = entries.findIndex(
      (item) => item[identifierIndexInRow] === identifier
    );

    if (indexToDelete === -1) return;
    entries.splice(indexToDelete, 1);

    message = initialTitle + renderMultipleItems(entries);
    stripAwayEmptyLines();
    return message;
  }

  return {
    getAllEntries,
    getItemBy,
    addItem,
    updateItemBy,
    deleteItemBy,
    populate,
  };
}

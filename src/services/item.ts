import { uuidv7 } from "uuidv7";
import { Item } from "../models/item";

export class ItemService {
    static getItemList = async (): Promise<Item[]> => {
        return readItemList();
    };

    static getItem = async (id: string): Promise<Item | undefined> => {
        const itemList = readItemList();
        return itemList.find((e) => e.id === id);
    }

    static createItem = async (item: Partial<Item>): Promise<Item> => {
        const newItem = { ...item, id: uuidv7() } as Item;
        addItem(newItem);
        return newItem;
    };

    static editItem = async (item: Partial<Item>): Promise<Item> => {
        const itemList = readItemList();
        const idx = itemList.findIndex((e) => e.id === item.id);
        itemList[idx] = item as Item;

        writeItemList(itemList);

        return item as Item;
    }

    static deleteItem = async (id: string): Promise<void> => {
        const itemList = readItemList();
        const idx = itemList.findIndex((e) => e.id === id);
        itemList.splice(idx, 1);

        writeItemList(itemList);
    }
}

function readItemList(): Item[] {
    const json = localStorage.getItem("item_list");
    if (json) {
        return JSON.parse(json) as Item[];
    } else {
        // set default item list
        const itemList: Item[] = [
            { id: uuidv7(), name: "아이템1", price: 1000 },
            { id: uuidv7(), name: "아이템2", price: -1000 },
            { id: uuidv7(), name: "아이템3", price: 2000 },
        ];
        writeItemList(itemList);
        return itemList;
    }
}

function writeItemList(itemList: Item[]): void {
    localStorage.setItem("item_list", JSON.stringify(itemList));
}

function addItem(item: Item): void {
    const itemList = readItemList();
    itemList.push(item);
    writeItemList(itemList);
}

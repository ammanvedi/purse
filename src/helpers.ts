import { readFileSync } from 'fs';

export const loadView = (
    name: string
): string => {
    return readFileSync(`./view/${name}.html`).toString();
};
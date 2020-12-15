import fs from 'fs';
import { isEmpty } from 'lodash';

enum SpecialChars {
    COMMA = ',',
    NEW_LINE = '\n',
}

export abstract class Reader<TypedData> {
    private contents: string;

    constructor(public filename: string, public file: string) {
        const result = fs.readFileSync(this.file, { encoding: 'utf-8' });
        if (result.endsWith(SpecialChars.COMMA) 
            || result.endsWith(SpecialChars.NEW_LINE)) {
            this.contents = result.slice(0, -1);
        } else {
            this.contents = result;
        }      
    }

    abstract mapRow(contents: string[][]): TypedData[];

    public read(): string[][] {
        if (isEmpty(this.contents)) {
            return [];
        }
        return this.contents
            .split(SpecialChars.NEW_LINE)
            .map((content: string): string[] => {
                return content.split(SpecialChars.COMMA);
            });
    }
}

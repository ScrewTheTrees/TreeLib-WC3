/**
 * A simple stringbuilder that concats strings in the most efficent way possible.
 */
import {RGB, RGBTextString} from "./RGB";

export class StringBuilder {
    public contentArray: string[] = [];
    public newLine = "\n";

    constructor(...initialD: any[]) {
        this.append(...initialD);
    }

    public append(...input: any[]): this {
        for (let i = 0; i < input.length; i++) {
            this.contentArray.push(tostring(input[i]));
        }
        return this;
    }

    public appendColored(input: any, color: RGB): this {
        this.contentArray.push(RGBTextString(color, tostring(input)));
        return this;
    }

    public appendLine(...input: any[]): this {
        for (let i = 0; i < input.length; i++) {
            this.contentArray.push(tostring(input[i]));
            this.contentArray.push(this.newLine);
        }
        return this;
    }

    public appendColoredLine(input: any, color: RGB): this {
        this.contentArray.push(RGBTextString(color, tostring(input)));
        this.contentArray.push(this.newLine);
        return this;
    }

    public removeLine(): this {
        let value = this.contentArray.pop();
        let len = this.contentArray.length;
        for (let i = 0; i <= len; i--) {
            value = this.contentArray[i];
            if (value == this.newLine || value == null) {
                break;
            } else {
                this.contentArray.pop();
            }
        }

        return this;
    }


    public toString() {
        return table.concat(this.contentArray);
    }
}
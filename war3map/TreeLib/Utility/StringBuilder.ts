export class StringBuilder {
    private contentArray: string[] = [];

    public append(input: any): this {
        this.contentArray.push(tostring(input));
        return this;
    }

    public appendLine(input: any): this {
        this.contentArray.push(tostring(input));
        this.contentArray.push("\n");
        return this;
    }


    public toString() {
        return table.concat(this.contentArray);
    }
}
export class CSV {
    public static Parse(parse: string, delimiter: string = ";"): string[] {
        let values: string[] = [];
        let current: string = "";
        for (let i = 0; i < parse.length; i++) {
            if (parse.charAt(i) == delimiter) {
                values.push(current);
                current = "";
            } else {
                current += parse.charAt(i);
            }
        }
        values.push(current);

        return values;
    }

    public static Compile(data: string[], delimiter: string = ";"): string {
        let compiled = "";
        for (let i = 0; i < data.length; i++) {
            if (i != 0) compiled += delimiter;
            compiled += data[i];
        }

        return compiled;
    }
}
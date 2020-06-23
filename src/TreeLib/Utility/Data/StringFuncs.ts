export class StringFuncs {

    public static blanks = "\n ";

    public static isBlank(s: string) {
        return (this.blanks.indexOf(s) >= 0);
    }

    public static UnpackStringNewlines(value: string) {
        let allLines: string[] = [];
        let currentLine = "";
        let previousChar = "";
        let skipToRealChar = true;
        for (let i = 0; i < value.length; i++) {
            let currentChar = value.charAt(i);
            if (this.isBlank(currentChar) && previousChar == "\n") {
                skipToRealChar = true;
                continue;
            }
            if (currentChar == "\n" && !skipToRealChar) {
                allLines.push(currentLine);
                currentLine = "";
            } else {
                currentLine += currentChar;
                skipToRealChar = false;
            }

            previousChar = currentChar;
        }
        if (currentLine.length > 0) allLines.push(currentLine);

        return allLines;
    }
}
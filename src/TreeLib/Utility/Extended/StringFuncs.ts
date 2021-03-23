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


    public static compareStringSimilar(s1: string, s2: string): number {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        let longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(tostring(longerLength));
    }

    private static editDistance(s1: string, s2: string) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        const costs: number[] = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
}
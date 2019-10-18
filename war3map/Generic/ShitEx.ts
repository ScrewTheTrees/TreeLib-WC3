export class ShitEx {
    public static separateNumbers(input: string) : string[] {
        let lastChar = "";
        const result : string[] = [];
        let build = "";

        for (let i = 0; i < input.length; i++) {
            const char = input.charAt(i);
            if (this.isNumber(char) != this.isNumber(lastChar)) {
                if (build.length > 0) {
                    result.push(build);
                    build = "";
                }
            }
            build += char;
            lastChar = char;
        }
        if (build.length > 0) {
            result.push(build);
        }

        return result;
    }


    private static isNumber(input: string) {
        return (input == "0" || input == "1" || input == "2" || input == "3" || input == "4"
            || input == "5" || input == "6" || input == "7" || input == "8" || input == "9");

    }
}
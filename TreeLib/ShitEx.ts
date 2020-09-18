/**
 * Generally ShitEx is a simplistic string reader system.
 * Its original purpose was separateNumbers to read region names such as.
 * gg_rct_route1waypoint1.
 * And make it into gg_rct_route   1    waypoint    1.
 * This way i could easily parse it into other systems...
 * You can use it if you'd like, or use something more refined.
 */
import {Quick} from "./Quick";

export class ShitEx {
    public static separateNumbers(input: string): string[] {
        let lastChar = "";
        const result: string[] = [];
        let build = "";

        for (let i = 0; i < input.length; i++) {
            const char = input.charAt(i);
            if (this.isNumber(char) != this.isNumber(lastChar)) {
                if (build.length > 0) {
                    Quick.Push(result, build);
                    build = "";
                }
            }
            build += char;
            lastChar = char;
        }
        if (build.length > 0) {
            Quick.Push(result, build);
        }

        return result;
    }


    private static isNumber(input: string) {
        return (input == "0" || input == "1" || input == "2" || input == "3" || input == "4"
            || input == "5" || input == "6" || input == "7" || input == "8" || input == "9");

    }
}
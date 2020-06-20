export class Encode {

    private static readonly int16Offset = 32_767;
    private static readonly int14Offset = 8_191;

    public static Int16ToChars(num: number): string {
        let num1 = (num + this.int16Offset) % 0x100;
        let num2 = ((num + this.int16Offset >>> 8)) % 0x100;

        return string.char(num1)
            + string.char(num2);
    }

    public static StringToInt16(str: string): number {
        let char1 = str.charAt(0);
        let char2 = str.charAt(1);

        let x = (string.byte(char1));
        x += (string.byte(char2) << 8);
        x -= this.int16Offset;

        return x;
    }

    //This is only to allow safe network sending of data, since null terminated strings
    //ruins the string by terminating it early.
    public static Int14ToChars(num: number): string {
        let num1 = ((num + this.int14Offset) % 0x80) + 64;
        let num2 = (((num + this.int14Offset) >>> 7) % 0x80) + 64;

        return string.char(num1)
            + string.char(num2);
    }

    //Unpack these special char ints on the other side.
    public static StringToInt14(str: string): number {
        let char1 = str.charAt(0);
        let char2 = str.charAt(1);

        let x = (string.byte(char1) - 64);
        x += ((string.byte(char2) - 64) << 7);
        x -= this.int14Offset;

        return x;
    }

    public static Compress14BitChunk(x: number, y: number, width: number, height: number, data: number[][]) {
        let assemble = this.Int14ToChars(x);
        assemble += this.Int14ToChars(y);
        assemble += this.Int14ToChars(width);
        assemble += this.Int14ToChars(height);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let input = 0;
                if (data[i] != null) input = data[i][j] || 0;

                assemble += this.Int14ToChars(input);
            }
        }

        return assemble;
    }

    public static Decompress14BitChunk(data: string) {
        let x = this.StringToInt14(data.substr(0, 2));
        let y = this.StringToInt14(data.substr(2, 2));
        let width = this.StringToInt14(data.substr(4, 2));
        let height = this.StringToInt14(data.substr(6, 2));
        let index = 8;
        let arr: number[][] = [];

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let num = this.StringToInt14(data.substr(index, 2));
                if (arr[i] == null) arr[i] = [];
                arr[i][j] = num;

                index += 2;
            }
        }

        return {
            x: x,
            y: y,
            width: width,
            height: height,
            data: arr
        };
    }
}
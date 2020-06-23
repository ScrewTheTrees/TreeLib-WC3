export class EncodingInt8 {
    private static readonly int8Offset = 128;

    public static ToChars(num: number): string {
        let num1 = (num + this.int8Offset) % 0x100;

        return string.char(num1);
    }

    public static ToInt(str: string): number {
        let char1 = str.charAt(0);

        let x = (string.byte(char1));
        x -= this.int8Offset;

        return x;
    }
}
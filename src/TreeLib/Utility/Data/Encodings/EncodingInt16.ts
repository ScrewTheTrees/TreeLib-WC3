export class EncodingInt16 {
    private static readonly int16Offset = 32_767;

    public static ToChars(num: number): string {
        let num1 = (num + this.int16Offset) % 0x100;
        let num2 = ((num + this.int16Offset >>> 8)) % 0x100;

        return string.char(num1)
            + string.char(num2);
    }

    public static ToInt(str: string): number {
        let char1 = str.charAt(0);
        let char2 = str.charAt(1);

        let x = (string.byte(char1));
        x += (string.byte(char2) << 8);
        x -= this.int16Offset;

        return x;
    }
}
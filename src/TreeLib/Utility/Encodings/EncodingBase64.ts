
export class EncodingBase64 {
    public static PADCHAR: string = '=';
    public static ALPHA: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';


    public static Decode(s: string) {
        let pads: number, i: number, b10: number;
        let imax = s.length;
        if (imax === 0) {
            return s;
        }

        if (imax % 4 !== 0) {
            throw "Cannot decode base64";
        }

        pads = 0;
        if (s.charAt(imax - 1) === this.PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === this.PADCHAR) {
                pads = 2;
            }
            // either way, we want to ignore this last block
            imax -= 4;
        }

        let x: string[] = [];
        for (i = 0; i < imax; i += 4) {
            b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12) |
                (this.getbyte64(s, i + 2) << 6) | this.getbyte64(s, i + 3);
            x.push(string.char(b10 >>> 16, (b10 >>> 8) & 0xff, b10 & 0xff));
        }

        switch (pads) {
            case 1:
                b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12) | (this.getbyte64(s, i + 2) << 6);
                x.push(string.char(b10 >>> 16, (b10 >>> 8) & 0xff));
                break;
            case 2:
                b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12);
                x.push(string.char(b10 >>> 16));
                break;
        }
        return table.concat(x);
    }

    public static Encode(s: string) {
        let b10: number;
        let i: number;
        let x: string[] = [];

        let imax = s.length - s.length % 3;

        if (s.length === 0) {
            return s;
        }
        for (i = 0; i < imax; i += 3) {
            b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8) | this.getbyte(s, i + 2);
            x.push(this.ALPHA.charAt(b10 >>> 18));
            x.push(this.ALPHA.charAt((b10 >>> 12) & 0x3F));
            x.push(this.ALPHA.charAt((b10 >>> 6) & 0x3f));
            x.push(this.ALPHA.charAt(b10 & 0x3f));
        }
        switch (s.length - imax) {
            case 1:
                b10 = this.getbyte(s, i) << 16;
                x.push(this.ALPHA.charAt(b10 >>> 18) + this.ALPHA.charAt((b10 >>> 12) & 0x3F) +
                    this.PADCHAR + this.PADCHAR);
                break;
            case 2:
                b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8);
                x.push(this.ALPHA.charAt(b10 >>> 18) + this.ALPHA.charAt((b10 >>> 12) & 0x3F) +
                    this.ALPHA.charAt((b10 >>> 6) & 0x3f) + this.PADCHAR);
                break;
        }
        return table.concat(x);
    }

    private static getbyte64(s: string, i: number) {
        let idx = this.ALPHA.indexOf(s.charAt(i));
        if (idx === -1) {
            throw "Cannot decode base64";
        }
        return idx;
    }

    private static getbyte(s: string, i: number) {
        let x = s.charCodeAt(i);
        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }
        return x;
    }
}
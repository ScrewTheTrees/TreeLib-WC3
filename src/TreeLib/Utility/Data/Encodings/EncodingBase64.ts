const PADCHAR = '=';
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export class EncodingBase64 {
    private static getbyte64(s: string, i: number) {
        var idx = ALPHA.indexOf(s.charAt(i));
        if (idx === -1) {
            throw "Cannot decode base64";
        }
        return idx;
    }

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
        if (s.charAt(imax - 1) === PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === PADCHAR) {
                pads = 2;
            }
            // either way, we want to ignore this last block
            imax -= 4;
        }

        var x: string[] = [];
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
        return x.join('');
    }

    private static getbyte(s: string, i: number) {
        var x = s.charCodeAt(i);
        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }
        return x;
    }

    public static Encode(s: string) {
        let b10: number;
        let i: number;
        let x: string[] = [];

        var imax = s.length - s.length % 3;

        if (s.length === 0) {
            return s;
        }
        for (i = 0; i < imax; i += 3) {
            b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8) | this.getbyte(s, i + 2);
            x.push(ALPHA.charAt(b10 >>> 18));
            x.push(ALPHA.charAt((b10 >>> 12) & 0x3F));
            x.push(ALPHA.charAt((b10 >>> 6) & 0x3f));
            x.push(ALPHA.charAt(b10 & 0x3f));
        }
        switch (s.length - imax) {
            case 1:
                b10 = this.getbyte(s, i) << 16;
                x.push(ALPHA.charAt(b10 >>> 18) + ALPHA.charAt((b10 >>> 12) & 0x3F) +
                    PADCHAR + PADCHAR);
                break;
            case 2:
                b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8);
                x.push(ALPHA.charAt(b10 >>> 18) + ALPHA.charAt((b10 >>> 12) & 0x3F) +
                    ALPHA.charAt((b10 >>> 6) & 0x3f) + PADCHAR);
                break;
        }
        return x.join('');
    }
}
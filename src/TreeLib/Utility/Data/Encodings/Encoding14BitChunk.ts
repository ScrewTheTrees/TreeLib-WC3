import {EncodingInt14} from "./EncodingInt14";

export class Encoding14BitChunk {
    public static Compress14BitChunk(x: number, y: number, width: number, height: number, data: number[][]) {
        let assemble = EncodingInt14.ToChars(x);
        assemble += EncodingInt14.ToChars(y);
        assemble += EncodingInt14.ToChars(width);
        assemble += EncodingInt14.ToChars(height);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let input = 0;
                if (data[i] != null) input = data[i][j] || 0;

                assemble += EncodingInt14.ToChars(input);
            }
        }

        return assemble;
    }

    public static Decompress14BitChunk(data: string) {
        let x = EncodingInt14.ToInt(data.substr(0, 2));
        let y = EncodingInt14.ToInt(data.substr(2, 2));
        let width = EncodingInt14.ToInt(data.substr(4, 2));
        let height = EncodingInt14.ToInt(data.substr(6, 2));
        let index = 8;
        let arr: number[][] = [];

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let num = EncodingInt14.ToInt(data.substr(index, 2));
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
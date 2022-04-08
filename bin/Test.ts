import {PriorityQueue} from "../src/TreeLib/Utility/Data/PriorityQueue";
import {logger} from "./Utils";

// @ts-ignore
global.print = function (...args: any[]) {
    logger.info(args.concat())
}

type ShitType = { data: string };

let queue = PriorityQueue.new();
let queue2 = PriorityQueue.new();

for (let i = 0; i < 5; i++) {
    if (i % 50 === 1) {
        queue.recycle();
        queue2.recycle();
        queue = PriorityQueue.new();
        queue2 = PriorityQueue.new();
    }
    for (let i = 0; i < 1000; i++) {
        let num = Math.round(Math.random() * 11000) - 1000;
        queue.insertWithPriority({data: num.toString()}, num);
        queue2.insertWithPriority({data: num.toString()}, num);
    }
    for (let i = 0; i < 500; i++) {
        let data = queue.popLowestPriority();
        if (data) queue2.insertWithPriority(data, Number(data.data))
    }
    for (let i = 0; i < 1337; i++) {
        let num = Math.round(Math.random() * 11000) - 1000;
        queue.insertWithPriority({data: num.toString()}, num);
    }
    for (let i = 0; i < 420; i++) {
        let data = queue2.popLowestPriority();
        if (data) queue.insertWithPriority(data, Number(data.data))
    }
    if (i % 100 === 1) {
        while (queue.popLowestPriority() != null) {

        }
    }
}

// @ts-ignore
console.log(queue, queue.size());
// @ts-ignore
console.log(queue.entries[0]);
// @ts-ignore
console.log(queue.entries[queue.entries.length - 1]);

// @ts-ignore
console.log(queue, queue.size());
// @ts-ignore
console.log("end");

let data = queue.popLowestPriority();
let data2 = queue2.popLowestPriority();
console.log(data, data2)
while (data != undefined) {
    console.log(data);
    data = queue.popLowestPriority();
    data2 = queue2.popLowestPriority();
}
import {PriorityQueue} from "../src/TreeLib/Utility/Data/PriorityQueue";

type ShitType = { data: string };

let queue = new PriorityQueue<ShitType>();
let queue2 = new PriorityQueue<ShitType>();

for (let i = 0; i < 1000; i++) {
    queue.clear();
    queue2.clear();
    if (i % 50 === 1) {
        queue = new PriorityQueue<ShitType>();
        queue2 = new PriorityQueue<ShitType>();
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
while (data != undefined) {
    // @ts-ignore
    console.log(data);
    data = queue.popLowestPriority();
    data2 = queue2.popLowestPriority();
}
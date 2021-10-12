import {PriorityQueue} from "../src/TreeLib/Utility/Data/PriorityQueue";

type ShitType = { data: string };

let queue = new PriorityQueue<ShitType>();

for (let i = 0; i < 1000; i++) {
    let num = Math.round(Math.random() * 11000) - 1000;
    queue.insertWithPriority({data: num.toString()}, num);
}
for (let i = 0; i < 500; i++) {
    queue.popLowestPriority();
}
for (let i = 0; i < 1337; i++) {
    let num = Math.round(Math.random() * 11000) - 1000;
    queue.insertWithPriority({data: num.toString()}, num);
}
for (let i = 0; i < 420; i++) {
    queue.popLowestPriority();
}
// @ts-ignore
console.log(queue, queue.size());
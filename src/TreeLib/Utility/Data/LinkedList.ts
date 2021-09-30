import {Quick} from "../../Quick";


export class LinkedList<T> {
    public first?: ListNode<T>;
    public last?: ListNode<T>;

    public noOfEntries: number = 0;

    public insertAtStart(element: T) {
        const node: ListNode<T> = ListNode.new(this, element);
        let next = this.first;

        if (next) next.previous = node; //Point old head to new head.
        node.next = next; //Make head point to next.
        this.first = node; //Make new head.

        if (this.last == null) this.last = node; //Make sure everything points.

        this.noOfEntries += 1;
        return node;
    }

    public insertAtEnd(element: T) {
        const node: ListNode<T> = ListNode.new(this, element);
        let previous = this.last;

        if (previous) previous.next = node; //Point old head to new head.
        node.previous = previous; //Make head point to next.
        this.last = node; //Make new head.

        if (this.first == null) this.first = node;

        this.noOfEntries += 1;
        return node;
    }

    public popAtStart(): T | null {
        const node = this.first;
        if (node) {
            return node.remove().element;
        }
        return null;
    }

    public search(comparator: (data: T) => boolean): ListNode<T> | null {
        let currentNode = this.first;
        while (currentNode != null) {
            if (comparator(currentNode.element)) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    public forEach(func: (data: T) => void): ListNode<T> | null {
        let currentNode = this.first;
        while (currentNode != null) {
            func(currentNode.element);
            currentNode = currentNode.next;
        }

        return null;
    }

    public clear(isCoroutine: boolean = false) {
        let currentNode = this.first;
        let count = 0;
        while (currentNode != null) {
            currentNode.recycle();
            currentNode = currentNode.next;
            count++;
            if (isCoroutine && count % 32 == 0) coroutine.yield();
        }

        this.first = undefined;
        this.last = undefined;
        this.noOfEntries = 0;
    }
}

class ListNode<T> {
    public ownerList: LinkedList<T>;
    public previous?: ListNode<T>;
    public next?: ListNode<T>;
    public element: T;

    private constructor(ownerList: LinkedList<T>, element: T, previous?: ListNode<T>, next?: ListNode<T>) {
        this.ownerList = ownerList;
        this.element = element;
        this.previous = previous;
        this.next = next;
    }

    /**
     * Inserts element before this element.
     * @param element What to insert.
     */
    public insertBefore(element: T) {
        const newNode = new ListNode<T>(this.ownerList, element);
        if (this.previous) { //If there is a node before this node.
            this.previous.next = newNode; //Point head to new node
            newNode.previous = this.previous; //Point new node to head.

            newNode.next = this; //Point new node child to this.
            this.previous = newNode; //Point this head to new node.
        } else { //If this is the new first node.
            this.ownerList.insertAtStart(element);
            return;
        }

        this.ownerList.noOfEntries += 1;
        return this;
    }

    public remove() {
        if (this.next) this.next.previous = this.previous; //If not last entry, point to next child
        if (this.previous) this.previous.next = this.next; //If not first entry, point to new head.

        if (this.ownerList.first == this) this.ownerList.first = this.next; //If this is the first entry, move it to the next entry.
        if (this.ownerList.last == this) this.ownerList.last = this.previous; //If this is the last entry, move it to the previous entry.

        this.next = undefined;
        this.previous = undefined;

        this.ownerList.noOfEntries -= 1;
        this.recycle();
        return this;
    }

    //Stash API
    private static stash: ListNode<any>[] = [];

    public static new<T>(ownerList: LinkedList<T>, element: T, previous?: ListNode<T>, next?: ListNode<T>): ListNode<T> {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(ownerList, element, previous, next);
        else return new ListNode(ownerList, element, previous, next);
    }

    public static recycle(p: ListNode<any>) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle(): this {
        ListNode.recycle(this);
        return this;
    }

    public updateTo(ownerList: LinkedList<T>, element: T, previous?: ListNode<T>, next?: ListNode<T>): ListNode<T> {
        this.ownerList = ownerList;
        this.element = element;
        this.previous = previous;
        this.next = next;
        return this;
    }
}
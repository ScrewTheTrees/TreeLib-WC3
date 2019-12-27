export class LabelValue<L, V> {
    public label: L;
    public value: V;

    constructor(label: L, value: V) {
        this.label = label;
        this.value = value;
    }
}
export const enum MetaKey {
    ALL = -1, //This is not real, its for TreeLib exclusivity
    NONE = 0,
    SHIFT = 1,
    CTRL = 2,
    SHIFT_CTRL = 3,
    ALT = 4,
    SHIFT_ALT = 5,
    CTRL_ALT = 6,
    SHIFT_CTRL_ALT = 7,
}
export function maxMetaKeys() {
    return 7;
}
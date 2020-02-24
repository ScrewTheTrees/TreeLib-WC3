export class Players {
    public static get RED() {return Player(0)};
    public static get BLUE() {return Player(1)};
    public static get TEAL() {return Player(2)};
    public static get PURPLE() {return Player(3)};
    public static get YELLOW() {return Player(4)};
    public static get ORANGE() {return Player(5)};
    public static get GREEN() {return Player(6)};
    public static get PINK() {return Player(7)};
    public static get LIGHT_GRAY() {return Player(8)};
    public static get LIGHT_BLUE() {return Player(9)};
    public static get AQUA() {return Player(10)};
    public static get BROWN() {return Player(11)};
    public static get MAROON() {return Player(12)};
    public static get NAVY() {return Player(13)};

    public static get TURQUOISE() {
        return Player(14)
    };

    public static get VIOLET() {
        return Player(15)
    };

    public static get WHEAT() {
        return Player(16)
    };

    public static get PEACH() {
        return Player(17)
    };

    public static get MINT() {
        return Player(18)
    };

    public static get LAVENDER() {
        return Player(19)
    };

    public static get COAL() {
        return Player(20)
    };

    public static get SNOW() {
        return Player(21)
    };

    public static get EMERALD() {
        return Player(22)
    };

    public static get PEANUT() {
        return Player(23)
    };

    public static get NEUTRAL_HOSTILE() {
        return Player(GetPlayerNeutralAggressive())
    };

    public static get NEUTRAL_PASSIVE() {
        return Player(GetPlayerNeutralPassive())
    };

    public static get NEUTRAL_VICTIM() {
        return Player(GetBJPlayerNeutralVictim())
    };

    public static get NEUTRAL_EXTRA() {
        return Player(GetBJPlayerNeutralExtra())
    };
}
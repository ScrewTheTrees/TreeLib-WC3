import {Logger} from "../TreeLib/Logger";

export function assertEqualsString(a: string, b: string) {
    let err = "Expected \"" + a + "\" but instead got \"" + b + "\"";
    if (a != b) {
        Logger.LogCritical(err);
        error(err, 2);
    } else {
        Logger.LogVerbose("Passed Expected \"" + a + "\"");
    }
}

export function assertTrue(expression: boolean) {
    let err = "Expected \"true\" but instead got \"" + expression + "\"";
    if (!expression) {
        Logger.LogCritical(err);
        error(err, 2);
    } else {
        Logger.LogVerbose("Passed Expected \"" + expression + "\"");
    }
}
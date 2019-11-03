import {StringBuilder} from "../TreeLib/Utility/StringBuilder";
import {assertEqualsString} from "./Testing";

export class StringBuilderTest {
    run() {
        if (!pcall(() => {
            this.remove_everything();
            this.ensure_first_line_remains();
        })) {
            //uh
        }
    }

    remove_everything() {
        let builder = new StringBuilder();
        builder.append("cum");
        builder.append(" of ham");
        builder.removeLine();

        assertEqualsString("", builder.toString());
    }

    ensure_first_line_remains() {
        let builder = new StringBuilder();
        builder.appendLine("cum");
        builder.appendLine(" of ham");
        builder.removeLine();

        assertEqualsString("cum\n", builder.toString());
    }
}
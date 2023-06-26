import style from "./style.module.scss";
import classnames from "classnames";

export function Hello({ big }: { big: boolean }) {
    return (
        <h1
            className={classnames(style["color-red"], {
                [style["font-big"]]: big,
            })}
        >
            Hello
        </h1>
    );
}

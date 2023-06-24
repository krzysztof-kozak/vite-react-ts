import style from "./style.module.scss";

export function Hello() {
    return (
        <h1 className={`${style["color-red"]} ${style["font-big"]}`}>Hello</h1>
    );
}

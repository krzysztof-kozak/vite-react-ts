import style from "./style.module.scss";

export function History() {
    return (
        <ul className={style["move-list"]}>
            <li>
                <button>Go to move #1</button>
            </li>

            <li>
                <button>Go to move #2</button>
            </li>

            <li>
                <button>Go to move #3</button>
            </li>

            <li>
                <button>Go to move #4</button>
            </li>

            <li>
                <button>Go to move #5</button>
            </li>
        </ul>
    );
}

import { Square } from "../App";
import style from "./style.module.scss";

interface HistoryProps {
    history: Square[][];
}

export function History({ history }: HistoryProps) {
    return (
        <ul className={style["move-list"]}>
            {history.map((_value, index) => {
                return index > 0 ? (
                    <li key={index}>
                        <button>Go to move #{index}</button>
                    </li>
                ) : null;
            })}
        </ul>
    );
}

import { Square } from "../App";
import style from "./style.module.scss";

interface HistoryProps {
    history: Square[][];
    setHistory: () => void;
}

export function History({ history, setHistory }: HistoryProps) {
    function handleTimeTravel(index: number, value: Square[]) {
        return void 0;
    }

    return (
        <ul className={style["move-list"]}>
            {history.map((value, index) => {
                return index > 0 ? (
                    <li key={index}>
                        <button onClick={() => handleTimeTravel(index, value)}>
                            Go to move #{index}
                        </button>
                    </li>
                ) : null;
            })}
        </ul>
    );
}

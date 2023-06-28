import { Square } from "../App";
import style from "./style.module.scss";

interface HistoryProps {
    history: Square[][];
    onTimeTravel: (moveIndex: number) => void;
}

export function History({ history, onTimeTravel }: HistoryProps) {
    return (
        <ul className={style["move-list"]}>
            {history.map((_squares, moveIndex) => {
                return moveIndex > 0 ? (
                    <li key={moveIndex}>
                        <button onClick={() => onTimeTravel(moveIndex)}>
                            Go to move #{moveIndex}
                        </button>
                    </li>
                ) : null;
            })}
        </ul>
    );
}

import { Square } from "../App";
import classNames from "classnames";
import style from "./style.module.scss";

interface HistoryProps {
    history: Square[][];
    onTimeTravel: (moveIndex: number) => void;
    currentMove: number;
}

export function History({ history, onTimeTravel, currentMove }: HistoryProps) {
    return (
        <ul className={style["move-list"]}>
            {history.map((_squares, moveIndex) => {
                return moveIndex > 0 ? (
                    <li key={moveIndex}>
                        <button
                            className={classNames({
                                [style["current-move"]]:
                                    moveIndex === currentMove,
                            })}
                            onClick={() => onTimeTravel(moveIndex + 1)}
                        >
                            Go to move #{moveIndex}
                        </button>
                    </li>
                ) : null;
            })}
        </ul>
    );
}

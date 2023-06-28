import styles from "./style.module.scss";

interface StatusProps {
    nextMove: "X" | "O";
    winner: "X" | "O" | null;
}

export function Status({ nextMove, winner }: StatusProps) {
    return (
        <div className={styles.status}>
            {!winner && (
                <p>
                    Next: <b>{nextMove}</b>
                </p>
            )}

            {winner && (
                <p>
                    <b>{winner}</b> has won!
                </p>
            )}
        </div>
    );
}

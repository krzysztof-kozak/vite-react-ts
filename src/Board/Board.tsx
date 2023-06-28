import { ReactNode } from "react";
import style from "./style.module.scss";

interface BoardProps {
    children: ReactNode;
}

export function Board({ children }: BoardProps) {
    return <div className={style.board}>{children}</div>;
}

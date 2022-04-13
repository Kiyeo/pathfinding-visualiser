import { createContext } from "react";
import { GridContextType } from "../@types/gridContextType";

export const GridContext = createContext<GridContextType | null>(null);

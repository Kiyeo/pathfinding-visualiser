import { createContext } from "react";
import { GraphContextType } from "../@types/graphContextType";

export const GraphContext = createContext<GraphContextType | null>(null);

import { type Role } from "../store/mask";

export type BuiltinMask = Omit<Role, "id">;

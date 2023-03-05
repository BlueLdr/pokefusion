import type { EntryOf } from "~/utils";

/** Get key/value pairs of a Typescript enum the same way you would from a
 *  normal object with Object.entries */
export const enumEntries = <T>(obj: T): EntryOf<typeof obj>[] =>
  (Object.entries(obj as any) as EntryOf<typeof obj>[]).filter(
    ent =>
      // @ts-expect-error: for numbers, this is valid
      typeof obj[ent[1]] !== "number"
  );

/** Object.keys, but for Typescript enum */
export const enumKeys = <T>(obj: T): (keyof typeof obj)[] =>
  enumEntries(obj).map(ent => ent[0]);

/** Object.values, but for Typescript enum */
export const enumValues = <T>(obj: T): (typeof obj)[keyof typeof obj][] =>
  enumEntries(obj).map(ent => ent[1]);

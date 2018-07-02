/* @flow */
/* eslint-disable no-unused-vars */

export type FbsApp = {|
  name: string;
  +options: any;// $npm$firebase$Config;
  auth(): any;// $npm$firebase$auth$Auth;
  database(): $npm$firebase$database$Database;
  storage(): any;// $npm$firebase$storage$Storage;
  delete(): Promise<void>;
|}

type $npm$firebase$database$DataSnapshot = {|
  key: string;
  ref: $npm$firebase$database$Reference;
  child(path?: string): $npm$firebase$database$DataSnapshot;
  exists(): boolean;
  exportVal(): $npm$firebase$database$Value;
  forEach(action: ($npm$firebase$database$DataSnapshot) => boolean): boolean;
  getPriority(): $npm$firebase$database$Priority;
  hasChild(path: string): boolean;
  hasChildren(): boolean;
  numChildren(): number;
  toJSON(): Object;
  val(): $npm$firebase$database$Value;
|}

type $npm$firebase$database$Callback = (
  $npm$firebase$database$DataSnapshot,
  ?string
) => void;

type $npm$firebase$database$Value = any;
type $npm$firebase$database$OnCompleteCallback = (
  error: ?Object
) => void;

type $npm$firebase$database$QueryEventType =
  | "value"
  | "child_added"
  | "child_changed"
  | "child_removed"
  | "child_moved";
type $npm$firebase$database$Priority = string | number | null;

declare class $npm$firebase$database$Query {
  ref: $npm$firebase$database$Reference;
  endAt(
    value: number | string | boolean | null,
    key?: string
  ): $npm$firebase$database$Query;
  equalTo(
    value: number | string | boolean | null,
    key?: string
  ): $npm$firebase$database$Query;
  isEqual(other: $npm$firebase$database$Query): boolean;
  limitToFirst(limit: number): $npm$firebase$database$Query;
  limitToLast(limit: number): $npm$firebase$database$Query;
  off(
    eventType?: $npm$firebase$database$QueryEventType,
    callback?: $npm$firebase$database$Callback,
    context?: Object
  ): void;
  on(
    eventType: $npm$firebase$database$QueryEventType,
    callback: $npm$firebase$database$Callback,
    cancelCallbackOrContext?: (error: Object) => void | Object,
    context?: $npm$firebase$database$Callback
  ): $npm$firebase$database$Callback;
  once(
    eventType: $npm$firebase$database$QueryEventType,
    successCallback?: $npm$firebase$database$Callback,
    failureCallbackOrContext?: (error: Object) => void | Object,
    context?: Object
  ): Promise<$npm$firebase$database$DataSnapshot>;
  orderByChild(path: string): $npm$firebase$database$Query;
  orderByKey(): $npm$firebase$database$Query;
  orderByPriority(): $npm$firebase$database$Query;
  orderByValue(): $npm$firebase$database$Query;
  startAt(
    value: number | string | boolean | null,
    key?: string
  ): $npm$firebase$database$Query;
  toJSON(): Object;
  toString(): string;
}

declare class $npm$firebase$database$OnDisconnect {
  cancel(onComplete?: $npm$firebase$database$OnCompleteCallback): Promise<void>;
  remove(onComplete?: $npm$firebase$database$OnCompleteCallback): Promise<void>;
  set(
    value: $npm$firebase$database$Value,
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
  setWithPriority(
    value: $npm$firebase$database$Value,
    priority: number | string | null,
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
  update(
    values: { +[path: string]: $npm$firebase$database$Value },
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
}

type $npm$firebase$database$Reference = {
  ...$npm$firebase$database$Query;
  key: ?string;
  parent?: $npm$firebase$database$Reference;
  root: $npm$firebase$database$Reference;
  child(path: string): $npm$firebase$database$Reference;
  onDisconnect(): $npm$firebase$database$OnDisconnect;
  push(
    value?: $npm$firebase$database$Value,
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): $npm$firebase$database$Reference & Promise<void>;
  remove(onComplete?: $npm$firebase$database$OnCompleteCallback): Promise<void>;
  set(
    value: $npm$firebase$database$Value,
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
  on(path: string, callback: (val: $npm$firebase$database$DataSnapshot) => void): void;
  off(path: string, callback: (val: $npm$firebase$database$DataSnapshot) => void): void;
  setPriority(
    priority: $npm$firebase$database$Priority,
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
  setWithPriority(
    newVal: $npm$firebase$database$Value,
    newPriority: $npm$firebase$database$Priority,
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
  transaction(
    transactionUpdate: (
      data: $npm$firebase$database$Value
    ) => $npm$firebase$database$Value,
    onComplete?: (
      error: null | Object,
      committed: boolean,
      snapshot: $npm$firebase$database$DataSnapshot
    ) => void,
    applyLocally?: boolean
  ): Promise<{
    committed: boolean,
    snapshot: $npm$firebase$database$DataSnapshot | null
  }>;
  update(
    values: { [path: string]: $npm$firebase$database$Value },
    onComplete?: $npm$firebase$database$OnCompleteCallback
  ): Promise<void>;
  orderByChild(string): $npm$firebase$database$Reference;
  startAt(string): $npm$firebase$database$Reference;
}

type $npm$firebase$database$Database = {
  app: FbsApp;
  goOffline(): void;
  goOnline(): void;
  ref(path?: string): $npm$firebase$database$Reference;
  refFromURL(url: string): $npm$firebase$database$Reference;
}

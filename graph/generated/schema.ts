// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Pledge extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pledge entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pledge must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pledge", id.toString(), this);
    }
  }

  static load(id: string): Pledge | null {
    return changetype<Pledge | null>(store.get("Pledge", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get reason(): string {
    let value = this.get("reason");
    return value!.toString();
  }

  set reason(value: string) {
    this.set("reason", Value.fromString(value));
  }

  get pledge(): string | null {
    let value = this.get("pledge");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pledge(value: string | null) {
    if (!value) {
      this.unset("pledge");
    } else {
      this.set("pledge", Value.fromString(<string>value));
    }
  }

  get content(): string | null {
    let value = this.get("content");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set content(value: string | null) {
    if (!value) {
      this.unset("content");
    } else {
      this.set("content", Value.fromString(<string>value));
    }
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get backers(): Array<string> {
    let value = this.get("backers");
    return value!.toStringArray();
  }

  set backers(value: Array<string>) {
    this.set("backers", Value.fromStringArray(value));
  }
}

export class Backer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Backer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Backer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Backer", id.toString(), this);
    }
  }

  static load(id: string): Backer | null {
    return changetype<Backer | null>(store.get("Backer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get backer(): string | null {
    let value = this.get("backer");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set backer(value: string | null) {
    if (!value) {
      this.unset("backer");
    } else {
      this.set("backer", Value.fromString(<string>value));
    }
  }

  get backCause(): string {
    let value = this.get("backCause");
    return value!.toString();
  }

  set backCause(value: string) {
    this.set("backCause", Value.fromString(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pledges(): Array<string> {
    let value = this.get("pledges");
    return value!.toStringArray();
  }

  set pledges(value: Array<string>) {
    this.set("pledges", Value.fromStringArray(value));
  }
}

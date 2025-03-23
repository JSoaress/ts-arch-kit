## Installation

```sh
npm install ts-arch-kit
```

or yarn

```sh
yarn add ts-arch-kit
```

# AbstractModel

`AbstractModel` is a base class for domain entities that provides primary key management, state tracking, and equality comparison.


## Importing

```typescript
import { AbstractModel, AbstractModelProps } from "ts-arch-kit/dist/core";
```

## Usage

### Creating a Model Class

To use `AbstractModel`, extend it in your entity class:

```typescript
type UserProps = AbstractModelProps & {
    name: string;
    email: string;
};

class User extends AbstractModel<UserProps> {
    constructor(props: UserProps, isNew = true) {
        super(props, isNew);
    }

    getName(): string {
        return this.props.name;
    }
}
```

### Instantiating an Entity

```typescript
const newUser = new User({ name: "John Doe", email: "john@example.com" });
console.log(newUser.pk); // Automatically generated ID
console.log(newUser.isNew); // true
```

### Tracking Changes

```typescript
const user = new User({ pk: "123", name: "John Doe", email: "john@example.com" }, false);
console.log(user.isDirty()); // false

user.props.name = "John Smith";
console.log(user.isDirty()); // true
console.log(user.getDirtyProps()); // ["name"]
```

### Checking Equality

```typescript
const user1 = new User({ pk: "123", name: "Alice" }, false);
const user2 = new User({ pk: "123", name: "Alice" }, false);

console.log(user1.equals(user2)); // true
```

### Creating a Model Class with Numeric ID Generation

To use `AbstractModel`, extend it in your entity class and provide a custom numeric ID generator:

```typescript
let idCounter = 1;
function numericIdGenerator() {
    return idCounter++;
}

type UserProps = {
    pk?: number;
    name: string;
    email: string;
};

class User extends AbstractModel<UserProps> {
    constructor(props: UserProps, isNew = true) {
        super(props, isNew, numericIdGenerator);
    }

    getName(): string {
        return this.props.name;
    }
}
```

## API

### `AbstractModel<Props>`

#### Constructor

```typescript
constructor(props: Props, isNew?: boolean, idGenerator?: () => PrimaryKey)
```
- `props`: Model properties.
- `isNew`: Indicates if the entity is new (default: `true`).
- `idGenerator`: Custom function for ID generation (default: UUID).

#### Methods

- **`getDirtyProps(): string[]`** - Returns modified property names.
- **`checkDirtyProps(prop: string): boolean`** - Checks if a property has changed.
- **`isDirty(): boolean`** - Checks if any property has changed.
- **`equals(entity?: AbstractModel<Props>): boolean`** - Compares two entities by primary key.

## License
MIT


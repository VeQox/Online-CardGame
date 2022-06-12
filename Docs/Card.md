# Card

## Variables

| accessability | name    | type     | description                       |
| :------------ | :------ | :------- | :-------------------------------- |
| private       | _types  | string[] | array of card types               |
| private       | _values | string[] | array of card values              |
| private       | _type   | number   | index of the type in **_types**   |
| private       | _value  | number   | index of the value in **_values** |

## Properties

| accessability | name  | type   | description                                 |
| :------------ | :---- | :----- | :------------------------------------------ |
| public        | type  | string | returns **_types** on the index **_type**   |
| public        | value | string | returns **_values** on the index **_value** |

## Methods

| accessability | name      | type   | description                                   |
| :------------ | :-------- | :----- | :-------------------------------------------- |
| public        | toString  | string | returns the card as a string "{type} {value}" |
| public        | compareTo | number | compares two card objects                     |
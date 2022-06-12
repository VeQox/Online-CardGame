# Card

## Variables

| accessability | name   | type   | description    |
| :------------ | :----- | :----- | :------------- |
| private       | _cards | Card[] | array of cards |

## Properties

| accessability | name  | type   | description                  |
| :------------ | :---- | :----- | :--------------------------- |
| public        | count | number | returns length of **_cards** |

## Methods

| accessability | name           | type    | description                                                                           |
| :------------ | :------------- | :------ | :------------------------------------------------------------------------------------ |
| public        | add            | void    | adds a card to the internal **_cards** array                                          |
| public        | remove         | void    | removes a card from the internal **_cards** array                                     |
| public        | removeAt       | void    | removes a card at the given index from the internal **_cards** array                  |
| public        | indexOf        | number  | returns the index of the card in the **_cards** array                                 |
| public        | getAt          | Card    | returns the card on the given index                                                   |
| public        | contains       | boolean | checks if the **_cards** array has the given card                                     |
| public        | sort           | void    | sorts the array using the compareTo method                                            |
| private       | getPerType     | void    | returns all cards with the given type                                                 |
| public        | getUsableCards | void    | returns all usable cards if **getPerType** returns an empty array all cards are valid |
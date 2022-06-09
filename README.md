# Online-CardGame

## Message Syntax
### {"head" : {head}, "body": {body}}

| headers             |         body          |                           example                            | origin | description                                                                                             |
| :------------------ | :-------------------: | :----------------------------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------ |
| setReady            |          ""           |                                                              | client | sets the client as ready                                                                                |
| selectCard          |       "{Card}"        |                "{ "type": "❤", value: "A" }"                 | client | select a card if youre the currentPlayer                                                                |
| updateReady         | "{number} / {number}" |                           "3 / 4"                            | server | update readydisplay on every client                                                                     |
| startGame           |      "{id, playercount}"       |                             "{"id":"0", "count":"3"}"                              | server | starts game end sends the personal unique id to every player                                            |
| updateCards         |   "[{Card} {Card}]"   | "[{ "type": "❤", value: "A" }, { "type": "❤", value: "K" }]" | server | send a card array for display to the client                                                             |
| updateCurrentPlayer |      "{number}"       |                             "2"                              | server | sets the currentplayer and if the client is the currentplayer he can either set a call or select a Card |
| setCalls            |      "{number}"       |                             "3"                              | client | set a call if the client is the current Player                                                          |
| newTrick            |      "{string}"       |                             "❤"                              | server | start a new trick sends a new forced type with it                                                       |
| newRound            |      "{string}"       |                             "❤"                              | server | start a new round sends a new forced type with it                                                       |
| updatePoints        |      "{number}"       |                             "-3"                             | server | updates the points for every client gets sendt with newRound                                            |


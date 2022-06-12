# Message

## messageHead

| head                    | body                  |                          example                           | origin |
| :---------------------- | :-------------------- | :--------------------------------------------------------: | :----- |
| **setReady**            |                       |                                                            | client |
| **selectCard**          | {Card}                |                { "type": "❤", value: "A" }                 | client |
| **setCalls**            | {number}              |                            "3"                             | client |
| **updateReady**         | "{number} / {number}" |                          "3 / 4"                           | server |
| **startGame**           | "{id, playercount}"   |                  {"id":"0", "count":"3"}                   | server |
| **updateCards**         | [{Card}, {Card}]      | [{ "type": "❤", value: "A" }, { "type": "❤", value: "K" }] | server |
| **updateCurrentPlayer** | {number}              |                            "2"                             | server |
| **newTrick**            | {string}              |                            "❤"                             | server |
| **newRound**            | {string}              |                            "❤"                             | server |
| **updatePoints**        | "{number}             |                            "-3"                            | server |

## Variables

| accessability | name  | type            | description |
| :------------ | :---- | :-------------- | :---------- |
| private       | _head | **messageHead** | is used to set apart all the messages sent to and from the WebSocketServer |
| private       | _body | any             | holds any data to send the the client / user |

## Properties

| accessability | name | type   | description |
| :------------ | :--- | :----- | :---------- |
| public        | head | string |returns **_head** as a string|
| public        | body | any    | returns **_body** |
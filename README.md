# alexa-chatterbot
A chatterbot implementation for Alexa / Amazon Echo based on jsMegaHAL.

## Compiling

Run ``make`` to assemble the index.zip file for use on Amazon Lambda.

## Installing

Configure an Alexa Skill with a fully open intent schema:


    {
      "intents": [
        {
          "intent": "MessageA",
          "slots": [{
            "name": "WordA",
            "type": "Word"
          }]
        },
        {
          "intent": "MessageB",
          "slots": [{
            "name": "WordA",
            "type": "Word"
          },
          {
            "name": "WordB",
            "type": "Word"
          }]
        },
        {
          "intent": "MessageC",
          "slots": [{
            "name": "WordA",
            "type": "Word"
          },
          {
            "name": "WordB",
            "type": "Word"
          },
          {
            "name": "WordC",
            "type": "Word"
          }]
        },
        {
          "intent": "MessageD",
          "slots": [{
            "name": "WordA",
            "type": "Word"
          },
          {
            "name": "WordB",
            "type": "Word"
          },
          {
            "name": "WordC",
            "type": "Word"
          },
          {
            "name": "WordD",
            "type": "Word"
          }]
        },
        {
          "intent": "MessageE",
          "slots": [{
            "name": "WordA",
            "type": "Word"
          },
          {
            "name": "WordB",
            "type": "Word"
          },
          {
            "name": "WordC",
            "type": "Word"
          },
          {
            "name": "WordD",
            "type": "Word"
          },
          {
            "name": "WordE",
            "type": "Word"
          }]
        },
        {
          "intent": "MessageF",
          "slots": [{
            "name": "WordA",
            "type": "Word"
          },
          {
            "name": "WordB",
            "type": "Word"
          },
          {
            "name": "WordC",
            "type": "Word"
          },
          {
            "name": "WordD",
            "type": "Word"
          },
          {
            "name": "WordE",
            "type": "Word"
          },
          {
            "name": "WordF",
            "type": "Word"
          }]
        }
      ]
    }

And some simple utterances that use this schema:

    MessageA {WordA}
    MessageB {WordA} {WordB}
    MessageC {WordA} {WordB} {WordC}
    MessageD {WordA} {WordB} {WordC} {WordD}
    MessageE {WordA} {WordB} {WordC} {WordD} {WordE}
    MessageF {WordA} {WordB} {WordC} {WordD} {WordE} {WordF}

Create an AWS Lambda function, upload the compiled zip and associate the Alexa Skill with this Lambda.

## License Notes

jsMegaHAL is under Apache License 2.0, see https://github.com/seiyria/jsmegahal





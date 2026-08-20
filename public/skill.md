# Hanzo

> What Hanzo Cloud serves and how to call it, written for an agent working in
> someone else's codebase.

One host answers for the whole platform, `https://api.hanzo.ai`, and one
credential opens it. The section at the end lists every family the host serves;
it is read out of the API's own document on each build, so it cannot describe an
API that has moved on.

## Operate

- Work in the project you were asked about. Check which directory you are in
  before you write a file into it.
- The base is `https://api.hanzo.ai/v1`. `api` is the host, so `/api/` never
  appears in a path: `/v1/models`, not `/api/v1/models`.
- Call operations that exist. All of them are in the document at
  `https://api.hanzo.ai/v1/openapi.json`; a path absent from it answers 404.
  Never build a path out of a family name and a guess about the rest.
- `GET /v1/commands` is the same surface as a flat list — every operation with
  its method, its path, its summary and the arguments it takes. Read it when you
  need an exact one. Neither it nor the document asks for a credential.
- Say what a call returned, status included, and never report a call you did not
  make.

## Authenticate

Hanzo IAM issues the credential. One login, one bearer, and that one bearer opens
every family listed at the end.

```sh
hanzo auth login                          # opens a browser, once per machine
export HANZO_TOKEN="$(hanzo auth token)"  # prints the bearer on stdout, alone
```

Send it on every call:

```sh
curl -sS https://api.hanzo.ai/v1/billing/balance \
  -H "Authorization: Bearer $HANZO_TOKEN"
```

Check two different things, because one call cannot answer both.

`GET /v1/models` proves the **host and the path**. It carries no credential —
the document declares it open — and answers `200` with the model list whether or
not you send a bearer. `404` there means your path is wrong.

`GET /v1/billing/balance` proves the **credential**: `401` without a bearer,
`200` with a good one. Never test a token against a route that does not require
one; it will pass while your token is worthless.

And do not read `200` alone as success. Some IAM routes answer `200` carrying
`{"status":"error","msg":"please sign in first"}` in the body, so an agent that
only reads status codes will believe it is signed in when it is not. Read the
body.

## Install

The CLI, by the one line every Hanzo surface prints for it:

```sh
curl -fsSL https://hanzo.sh | sh
```

It puts `hanzo` in `~/.local/bin`, alongside `hanzo-mcp` and the `dev` agent. On
npm the same CLI is `@hanzo/cli`.

From code, one client per language, generated from the same document as this
file:

```sh
pip install hanzoai      # Python
npm install @hanzo/sdk   # TypeScript
```

The rest are at <https://hanzo.ai/sdks>.

## MCP

The fleet keeps an MCP door at `https://api.hanzo.ai/v1/mcp`, over streamable
HTTP, opened by the same bearer:

```json
{
  "mcpServers": {
    "hanzo": {
      "type": "http",
      "url": "https://api.hanzo.ai/v1/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

It carries one tool per subsystem rather than one per operation, because a tool
list is a prompt and thousands of near-identical entries make a model choose
badly. Call the subsystem's tool, name the operation in `op`, and pass that
operation's own arguments in `input`. The `describe` tool answers with any one
operation's description and input schema, so a session can learn an argument list
without leaving the door.

Tools for the machine you are on — filesystem, shell, code index, git — come from
a different server, `hanzo-mcp`, which the install line above also installs.

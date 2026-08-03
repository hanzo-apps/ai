#!/bin/sh
<<\EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="refresh" content="0; url=https://hanzo.sh"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Hanzo Install - Redirecting to hanzo.sh</title>
    <style>
      :root {
        --bg: #0a0a0a;
        --text: #e5e5e5;
        --muted: #737373;
        --accent: #ffffff;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }
      .container { text-align: center; }
      h1 { font-size: 1.5rem; margin-bottom: 1rem; }
      p { color: var(--muted); margin-bottom: 1rem; }
      a { color: var(--accent); }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Redirecting to hanzo.sh...</h1>
      <p>If you are not redirected, <a href="https://hanzo.sh">click here</a>.</p>
    </div>
  </body>
</html>
EOF

# Hanzo Installer - hands off to the canonical installer at hanzo.sh.
#
#   curl -fsSL hanzo.ai/install.sh | sh
#
# A browser gets the HTML above (the heredoc swallows it for a shell); a shell
# falls through to the exec below. One URL, both audiences.
#
# The path is install.sh, WITH the extension. It was /install, which hanzo.sh
# does not serve — and `curl -f` answers a 404 by writing nothing and exiting 22,
# so `sh` read an empty script and exited 0. The documented one-liner reported
# success and installed nothing, silently, for every user who ran it.
#
# -f is what makes that failure silent, so the exit status is checked here rather
# than trusted: a fetch that does not produce an installer must say so.
if ! i_script=$(curl -fsSL https://hanzo.sh/install.sh); then
    echo "hanzo: could not fetch the installer from https://hanzo.sh/install.sh" >&2
    exit 1
fi
printf '%s' "$i_script" | sh -s -- "$@"

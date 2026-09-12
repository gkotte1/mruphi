# Forms — where submissions actually go

Every public form on murphi.ai was opened in a browser, its markup read, and its
submit intercepted so the outbound request could be recorded without sending
anything. Nothing below is inferred.

There are three forms. The demo-request popup appears on **every** page, so it
is two of the three form elements you find on any given URL.

## 1. Contact — `/contact-us/`

| | |
|---|---|
| Form | `#contact-form` |
| Destination | `POST https://api.web3forms.com/submit` |
| Body | the form's own `FormData` |
| Credential | `access_key`, a hidden input in the page source |

Hidden fields the live form ships:

| name | value |
|---|---|
| `access_key` | the account key (**not** copied into this repo) |
| `subject` | `New Inquiry from Murphi.ai website` |
| `from_name` | `Murphi.ai Website` |
| `redirect` | `false` — keeps Web3Forms from navigating away |
| `botcheck` | honeypot checkbox |

Visible fields: `first_name`\*, `last_name`, `email`\*, `organization`,
`message`\*.

Behaviour: the button is disabled and swaps its label for a spinner; on
`data.success` the form is replaced by the ✅ panel; on failure a red box reads
*"⚠️ Something went wrong. Please try again or email us at info@murphi.ai"* and
the button is restored.

## 2. Demo request — the popup, every page

| | |
|---|---|
| Form | `#murphiAiConnectForm` |
| Destination | `POST https://api.web3forms.com/submit` |
| Appended in JS | `access_key`, `subject`, `from_name` |

| name | value |
|---|---|
| `subject` | `Request Received from Murphi.ai Popup Demo Form` |
| `from_name` | `Murphi.ai Website Popup` |

Fields: `full_name`\*, `email`\*, `company_name`, `problem`.

Behaviour: on `data.success` the success panel is shown and the form reset; on
failure the live page calls `alert("Something went wrong. Please try again.")`.
This project keeps its existing inline error state instead of an `alert`, which
is the same information without hijacking the page.

## 3. Support ticket — `/support-ticket/`

This one is not a Web3Forms form. The page carries **two** handlers:

- an inline `handleSupportSubmit` that composes a `mailto:info@murphi.ai` with
  subject `Murphi.ai Support Ticket` — a fallback, and
- a later script that replaces it whenever `window.MurphiSupportTicketConfig`
  exists. It does, so this is the live behaviour:

| | |
|---|---|
| Destination | `POST https://murphi.ai/wp-admin/admin-ajax.php` |
| Body | multipart `FormData` |
| Action | `action=murphi_support_ticket` |
| Auth | `nonce`, minted per page render by WordPress |
| Server side | the PHP handler opens a **Jira** ticket |
| Response | `{ success: bool, data: { message } }` |

Fields: `first_name`\*, `last_name`\*, `email`\*, `organization`\*, `issue`\*,
and an optional `screenshot` file.

Behaviour: a blank required field shows *"Please fill in all mandatory fields
marked with an asterisk (\*)."*; the button disables and reads *"Submitting..."*;
success shows a green banner with the server's message (default *"Your support
ticket has been submitted. Our team will reply by email."*), scrolls it into
view and resets the form; failure shows a red banner with the server's message
or *"Unable to submit ticket. Please try again."*

## How this project reproduces them

The access key is public-by-design in Web3Forms' model, but it is still Murphi's
credential and does not belong in a Git repository. So all three forms post to
our own route handlers, and the key is read from the environment there:

| Form | Route | Then |
|---|---|---|
| Contact | `POST /api/contact` | Web3Forms, with the live subject/from_name |
| Demo request | `POST /api/demo-request` | Web3Forms, with the live subject/from_name |
| Support ticket | `POST /api/support-ticket` | `SUPPORT_TICKET_ENDPOINT` if set, else Web3Forms |

Each route validates exactly what the live form validates, honours the
`botcheck` honeypot by accepting-and-dropping, and returns the status the UI
needs for its success and error states.

`admin-ajax.php` cannot be called from here — its nonce is bound to a WordPress
session — so the support route forwards the ticket to whatever endpoint replaces
it. Point `SUPPORT_TICKET_ENDPOINT` at the Jira integration to restore the live
path exactly. Until either that or `WEB3FORMS_ACCESS_KEY` is set, the route
answers `503` and the form shows its error banner: it never claims a ticket was
filed when nothing was sent.

### Environment variables

See `.env.example`. Nothing is committed:

| Variable | Required | Used by |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | for contact + demo | all three routes |
| `SUPPORT_TICKET_ENDPOINT` | optional | `/api/support-ticket` |
| `SUPPORT_TICKET_TOKEN` | optional | `/api/support-ticket` |
| `NEXT_PUBLIC_SITE_URL` | optional | canonicals, OG, sitemap, robots |

### One deliberate gap

The live support form can attach a screenshot, and the WordPress handler takes
the bytes. Web3Forms only accepts attachments on paid plans, so the fallback
path forwards the **file name** and not the file. A real
`SUPPORT_TICKET_ENDPOINT` should take the upload; until one exists, the ticket
records which file the reporter meant to send.

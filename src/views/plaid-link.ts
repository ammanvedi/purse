export const plaidLink = (publicKey: string) => `
<html>
    <head></head>
    <body>
        <button id="link-button">Link Account</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
        <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
        <script type="text/javascript">
        (function($) {
          const handler = Plaid.create({
            clientName: 'Plaid Quickstart',
            // Optional, specify an array of ISO-3166-1 alpha-2 country
            // codes to initialize Link; European countries will have GDPR
            // consent panel
            countryCodes: ['GB'],
            env: 'development',
            // Replace with your public_key from the Dashboard
            key: '${publicKey}',
            product: ['transactions'],
            language: 'en',
            onSuccess: function(public_token, metadata) {
              // Send the public_token to your app server.
              // The metadata object contains info about the institution the
              // user selected and the account ID or IDs, if the
              // Select Account view is enabled.
              console.log(public_token)
              $.post('/get_access_token', {
                public_token: public_token,
              });
            },
            onExit: function(err, metadata) {
              // The user exited the Link flow.
              if (err != null) {
                // The user encountered a Plaid API error prior to exiting.
              }
              // metadata contains information about the institution
              // that the user selected and the most recent API request IDs.
              // Storing this information can be helpful for support.
            },
            onEvent: function(eventName, metadata) {
              // Optionally capture Link flow events, streamed through
              // this callback as your users connect an Item to Plaid.
              // For example:
              // eventName = "TRANSITION_VIEW"
              // metadata  = {
              //   link_session_id: "123-abc",
              //   mfa_type:        "questions",
              //   timestamp:       "2017-09-14T14:42:19.350Z",
              //   view_name:       "MFA",
              // }
            }
          });
        
          $('#link-button').on('click', function(e) {
            handler.open();
          });
        })(jQuery);
        </script>
    </body>
</html>
`;

// Based on https://github.com/as-a-service/remix-auth-github/blob/main/src/index.ts
// And https://github.com/s-k-m-s/netlify-cms-oauth-provider-go/blob/master/main.go
// And https://github.com/netlify/gotrue/blob/master/api/provider.go
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify(message),
          message.origin
        );
        window.close();
      };
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    </script>
  </body>
</html>
`;

const createToken = async (env, code) => {
  const params = {
    client_id: env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_CLIENT_SECRET,
    code,
  };
  const response = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  const { access_token, error, error_description } = await response.json();
  if (error) {
    throw new Error(error_description);
  }
  return access_token;
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const provider = url.searchParams.get('provider');
    if (provider === 'github' && code) {
      const token = await createToken(env, code);
      return new Response(
        html.replace(
          'authorization:github:success:',
          `authorization:github:success:${JSON.stringify({
            provider: 'github',
            token,
          })}`
        ),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }
    return new Response('Hello World!');
  },
};

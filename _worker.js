export default {
  async fetch(request, env) {
    const authHeader = request.headers.get('Authorization');
    
    // Set your custom username and 4-digit code here!
    const EXPECTED_USER = "folio";
    const EXPECTED_PASS = "1994"; // Replace 1234 with your code

    const expectedAuth = 'Basic ' + btoa(EXPECTED_USER + ':' + EXPECTED_PASS);

    if (authHeader === expectedAuth) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Protected Area', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Site"',
      },
    });
  },
};

export default async function handler(req, res) {
  const previousPage = req.headers.referer; // get page URL that sent the request to redirect back.

  // If the preview is on: Turned it off.
  if(req.preview) {
    res.clearPreviewData();
    res.writeHead(307, { location: previousPage });
    return res.end();
  }

  const password = 'SENHASEGURA';
  if(req.query.password !== password) {
    return res.status(401).json({ message: 'Invalid Password' });
  }

  // If the preview is off: Turned it on
  res.setPreviewData ({}); // Next Doc: https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode
  res.writeHead(307, { location: previousPage });
  res.end();
}


export default async (req, res) => {
  let d1 = Date.now();
  let d2 = 0;
  try {
    const resp = await fetch(req.query.url);
    if (resp.ok) {
      d2 = Date.now();
      let body = await resp.text();
      if (body.includes("<html")) {
        d2 = Date.now();
      }
      res.status(200).json({ time: d2 - d1 });
    } else {
      res.status(200).send({ time: -1 });
    }
  } catch (e) {
    res.status(200).send({ time: -1 });
  }
};

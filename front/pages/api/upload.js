import formidable from "formidable";

const handler = (req, res) => {
  if (req.method === "POST") {
    if (!req.user) return res.status(401).send("You need to be logged in.");
    const form = new formidable.IncomingForm();
    return form.parse(req, (err, fields, files) => {
      console.log(files.profilePicture.path);
      res.end("File uploaded");
    });
  }
  return res.status(405).end();
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import upload from "../../lib/multer";
import { createWorker, createScheduler } from "tesseract.js";
const app = nextConnect({
  onError(err, req, res) {
    res.json({ error: err.message });
  },
  onNoMatch(req, res) {
    res.status(404).send("Not found");
  },
});

app.use(upload.array("file"));

app.post(async (req, res) => {
  const id = req.body.id;

  console.log(id);
  const files = req.files;

  console.log(files);

  let index = 0;
  const scheduler = createScheduler();
  const result = [];

  await (async () => {
    for (var i = 0; i < 7; i++) {
      const w = createWorker();
      await w.load();
      await w.loadLanguage("eng");
      await w.initialize("eng");
      scheduler.addWorker(w);
    }
    const rets = await Promise.all(
      files.map((file) =>
        scheduler.addJob("recognize", `./public/${file.filename}`)
      )
    );
    console.log(rets);
    result.push(rets.map(({ data: { text } }) => text));

    await scheduler.terminate();
  })();

  let index2 = 0;
  const check = [];
  result[0].map((data) => {
    req.body.id[index2];
    const findText = (text, str) => {
      return str.indexOf(text) > -1;
    };
    console.log({ id: id[index2] });
    check.push(findText(id[index2], data));
    index2++;
  });

  index++;

  res.json(check);
});
export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};

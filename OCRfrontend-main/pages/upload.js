import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Upload() {
  const router = useRouter();
  const { id } = router.query;
  const { id2 } = router.query;
  const { id3 } = router.query;
  const { id4 } = router.query;
  const { id5 } = router.query;
  const { id6 } = router.query;
  const { id7 } = router.query;
  const { name } = router.query;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);

  // const [file7, setFile7] = useState(null);
  // const [file8, setFile8] = useState(null);

  const uploadFile = async () => {
    setLoading(true);
    const ids = [id, id2, id3, id4, id5, id6, id7];

    console.log(ids);
    const data = new FormData();
    data.append("file", file);
    data.append("file", file2);
    data.append("file", file3);
    data.append("file", file4);
    data.append("file", file5);
    data.append("file", file6);
    // data.append("file", file7);
    // data.append("file", file8);
    // data.append("file", file9);
    data.append("name", name);
    // data.append("id1", id);
    // data.append("id2", id2);
    // data.append("id3", id3);

    for (var i = 0; i < ids.length; i++) {
      if (ids[i] !== null) {
        data.append("id[]", ids[i]);
        console.log(ids[i]);
      }
    }
    // data.append("id", JSON.stringify([id, id2, id3]));
    await axios
      .post("/api/ocr", data)
      .then((res) => {
        setLoading(false);
        // setMessage(
        //   res.data
        // );
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.message);
      });
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-20 rounded-xl">
        <h1 className="text-center  text-4xl pb-6">Abu Dhabi License</h1>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <h1 className="text-center text-4xl pb-6"> Sharjah License </h1>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile2(e.target.files[0])}
        />
        <h1 className="text-center  text-4xl pb-6"> Al-Quwain License </h1>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile3(e.target.files[0])}
        />
        <h1 className="text-center  text-4xl pb-6"> Dubai License </h1>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile4(e.target.files[0])}
        />
        <h1 className="text-center  text-4xl pb-6"> Ajman License </h1>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile5(e.target.files[0])}
        />
        <h1 className="text-center  text-4xl pb-6"> R.s.Khaimah License </h1>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile6(e.target.files[0])}
        />
        {/* 
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile7(e.target.files[0])}
        /> */}
        {/* 
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile8(e.target.files[0])}
        /> */}
        {/* 
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile9(e.target.files[0])}
        /> */}

        <button
          className="bg-blue-500 p-2 mt-5 text-white rounded-xl w-32"
          onClick={uploadFile}
        >
          Upload
        </button>

        <p className="text-xl pt-5">{message}</p>

        <div className="p-5">
          <ClipLoader
            color={"black"}
            loading={loading}
            css={override}
            size={20}
          />
        </div>
      </div>
    </div>
  );
}

export default Upload;

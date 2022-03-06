import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/all")
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <img src="" alt="pic" />
    </div>
  );
}

import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { DSVRowArray } from "d3-dsv";

function useData(dataUrl: string) {
  const [data, setData] = useState<DSVRowArray<string> | null>(null);

  useEffect(() => {
    csv(dataUrl).then(setData);
  }, []);

  return data;
}

export default useData;

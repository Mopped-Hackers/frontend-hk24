import "./HomeView.css";
import { Helmet } from "react-helmet";
// Core viewer

// Import styles
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Create new plugin instance

function DoneView() {


    const [file, setFile] = useState<null|string>(null);
    const [searchParams] = useSearchParams();
  
    useEffect(() => {
      const fetchFile = async () => {
        const fileParam: string|null = searchParams.get("file");
        setFile(fileParam);
      };
  
      fetchFile();
    }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>LegacyLifter</title>
      </Helmet>
      <h1>LegacyLifter</h1>
      <h3>Generated: {file}</h3>

        { file ? <iframe src={file} width="100%" height={700} title="file"/> : null}
    
    </>
  );
}

export default DoneView;

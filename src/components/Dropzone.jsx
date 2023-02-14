//*Dropzone.js*//
import { useDropzone } from "react-dropzone";

const Dropzone = ({ file, setFile }) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="dropzone-content">
          Drag’n’drop some files here, or click to select files
        </p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default Dropzone;

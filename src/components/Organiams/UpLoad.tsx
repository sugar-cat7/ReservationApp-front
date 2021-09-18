import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../lib/firebaseHelper';
import { TaskState, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

//切り抜き
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from '../Atoms/Modal';

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: TaskState;
};

const UpLoad: React.FC = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [clickable, setClickable] = useState(false);
  const [src, setSrc] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert('画像のみ受け付けることができます。');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
  });

  const handleUpload = (acceptedImg: File[]) => {
    console.log(acceptedImg);
    try {
      // アップロード処理
      const storageRef = ref(storage, `/images/${acceptedImg[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, acceptedImg[0]);

      uploadTask.on(
        'state_changed',
        (snapshot: firebaseOnLoadProp) => {
          const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // 失敗した時
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.error('許可がありません');
              break;

            case 'storage/canceled':
              console.error('アップロードがキャンセルされました　');
              // User canceled the upload
              break;

            case 'storage/unknown':
              console.error('予期せぬエラーが発生しました');
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // 成功した時
          try {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
              console.log('ダウンロードしたURL' + downloadURL);
            });
          } catch (error: any) {
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('ファイルが存在しませんでした');
                break;
              case 'storage/unauthorized':
                console.log('許可がありません');
                break;
              case 'storage/canceled':
                console.log('キャンセルされました');
                break;
              case 'storage/unknown':
                console.log('予期せぬエラーが生じました');
                break;
            }
          }
        },
      );
    } catch (error) {
      console.log('エラーキャッチ', error);
    }
  };

  const handlePreview = (files: File[]) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
    };
  };

  return (
    <div>
      <div className="w-4/5 px-4 py-2 mx-auto my-4 text-center rounded-md">
        <div className="bg-gray-400 border-2 border-gray-500 rounded-md" {...getRootProps()}>
          {/* この中をタップすれば画像を選択できる */}
          <input {...getInputProps()} />
          {myFiles.length === 0 ? (
            <p className="py-4">グループ画像を登録できます</p>
          ) : (
            <div>
              {myFiles.map((file: File) => (
                <React.Fragment key={file.name}>{src && <img src={src} />}</React.Fragment>
              ))}
            </div>
          )}
        </div>
        {myFiles.length > 0 && (
          <button
            disabled={!clickable}
            type="submit"
            className="px-4 py-2 my-4 bg-gray-300 rounded-md border border-1"
            onClick={() => handleUpload(myFiles)}
          >
            画像UPLOAD
          </button>
        )}
      </div>
      <Modal />
    </div>
  );
};
export default UpLoad;

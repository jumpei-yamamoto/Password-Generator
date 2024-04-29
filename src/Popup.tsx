import React, { useState } from "react";
import Modal from "./components/Modal";
import Form from "./components/Form";

const Popup: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // TypeScriptでの型定義
  interface StorageResult {
    [key: string]: string | undefined;
  }

  const retrievePassword = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTitle = tabs[0].title; // 現在のタブのタイトルを取得

      // ローカルストレージからパスワードを取得
      chrome.storage.local.get([currentTitle], (result: StorageResult) => {
        const password = result[currentTitle as string];
        if (password) {
          console.log("Retrieved password:", password);
          navigator.clipboard
            .writeText(password)
            .then(() => {
              console.log("Password copied to clipboard!");
            })
            .catch((err) => {
              console.error("Failed to copy password:", err);
            });
        }
      });
    });
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="mt-4 bg-violet-50 text-gray-400 hover:bg-violet-200 hover:text-white font-bold py-2 px-4 rounded"
      >
        Generate Password
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Form />
      </Modal>
      <button
        onClick={retrievePassword}
        className="mt-4 bg-violet-50 text-gray-400 hover:bg-violet-200 hover:text-white font-bold py-2 px-4 rounded"
      >
        Retrieve Password
      </button>
    </div>
  );
};

export default Popup;

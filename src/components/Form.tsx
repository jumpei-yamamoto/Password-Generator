import { useState } from "react";
import styles from "./Form.module.css";

const Form = () => {
  const [keyword, setKeyword] = useState("");
  const [length, setLength] = useState("");
  const [offset, setOffset] = useState("");
  const [includeKeyword, setIncludeKeyword] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = () => {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let passLength = parseInt(length);
    if (includeUppercase) {
      letters += letters.toUpperCase();
    }
    if (includeNumbers) {
      letters += "0123456789";
    }
    if (includeSymbols) {
      letters += "!#$%&()*+";
    }
    if (!includeKeyword) {
      passLength += keyword.length;
    }

    // 文字列を配列に変換
    const letterArray = letters.split("");

    const getRandomElement = (array: string[]): string => {
      return array[Math.floor(Math.random() * array.length)];
    };

    const getRandomSubarray = (array: string[], length: number): string[] => {
      return Array.from({ length }, () => getRandomElement(array));
    };

    const passwordLetters = getRandomSubarray(letterArray, passLength);
    passwordLetters.sort(() => Math.random() - 0.5);

    const keywordLetters = keyword.split("");
    const offsetNum = parseInt(offset);

    if (offsetNum > 0) {
      for (let i = 0; i < keywordLetters.length; i++) {
        if (offsetNum + i < passwordLetters.length) {
          passwordLetters[offsetNum + i] = keywordLetters[i];
        }
      }
    } else {
      for (let i = 0; i < keywordLetters.length; i++) {
        if (i < passwordLetters.length) {
          passwordLetters[i] = keywordLetters[i];
        }
      }
    }

    // const password = passwordLetters.join("");
    // console.log("Generated Password:", password);
    return passwordLetters.join("");
  };

  interface PasswordStorage {
    [key: string]: string;
  }

  const handleGenerateClick = async () => {
    const newPassword = generatePassword();
    console.log("Generated Password:", newPassword);

    try {
      await navigator.clipboard.writeText(newPassword);
      console.log("Password copied to clipboard!");

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const pageTitle = tabs[0].title; // 現在のタブのタイトルを取得
        let obj: PasswordStorage = {};
        obj[pageTitle as string] = newPassword;
        chrome.storage.local.set(obj, () => {
          // ローカルストレージに保存
          console.log("Password saved with the page title as the key.");

          chrome.storage.local.get(null, (items) => {
            // 保存したアイテムを確認
            console.log("All stored items:", items);
          });

          window.close();
        });
      });
    } catch (err) {
      console.error("Failed to copy password: ", err);
      window.close();
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <div className={styles.field}>
          <label htmlFor="keyword" className={styles.label}>
            キーワード:
          </label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="length" className={styles.label}>
            文字数を指定してください:
          </label>
          <input
            type="text"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="offset" className={styles.label}>
            オフセットを指定してください:
          </label>
          <input
            type="text"
            id="offset"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className={styles.field}>
          <input
            type="checkbox"
            id="includeKeyword"
            checked={includeKeyword}
            onChange={(e) => setIncludeKeyword(e.target.checked)}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          />
          <label htmlFor="includeKeyword">Keywordを含む</label>
        </div>
        <div className={styles.field}>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          />
          <label htmlFor="includeNumbers">数字の有無</label>
        </div>
        <div className={styles.field}>
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          />
          <label htmlFor="includeUppercase">大文字の有無</label>
        </div>
        <div className={styles.field}>
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          />
          <label htmlFor="includeSymbols">記号の有無</label>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleGenerateClick}>Generate Password</button>
        </div>
      </div>
    </div>
  );
};

export default Form;

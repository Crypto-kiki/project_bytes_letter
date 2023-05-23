import { useState, useEffect } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./web3.config";

const web3 = new Web3(window.ethereum);

function App() {
  const [account, setAccount] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  // 지갑 로그인
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // 솔리디티 함수 값 전달하고 나서 call 함수 실행
  const write = async () => {
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const result = await contract.methods
      .letters(inputValue)
      .send({ from: accounts[0] });

    console.log(result); // 결과 처리

    read(); // check 함수 호출을 setResult 이후에 위치시킴
  };

  const read = async () => {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const result = await contract.methods.check().call({ from: accounts[0] });
    setResult(result); // check 함수의 반환값 저장
  };

  // 인풋 값 변경 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (result !== "") {
      read(); // write 함수 실행 후에 바로 check 함수를 호출하여 결과값을 업데이트합니다.
    }
  }, [result]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center w-full">
        <img src={`${process.env.PUBLIC_URL}/images/bird.gif`} />
        {account ? (
          <button className="border border-gray-500 px-4 py-2 rounded-xl">
            연결했음
          </button>
        ) : (
          <button
            className="border border-gray-500 px-4 py-2 rounded-xl"
            onClick={onClickAccount}
          >
            지갑 연결하셈
          </button>
        )}
      </div>
      <div className="flex justify-evenly items-center mt-20">
        <div>
          <div className="text-xl">아래에 편지쓰셈 bytes로 바꿔주겠음</div>
          <textarea
            className="mt-5 border-gray-400 border w-96 h-48 overflow-auto whitespace-pre-wrap break-words"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {account ? (
            <button
              onClick={() => write(inputValue)}
              className="border border-gray-500 px-4 py-2 rounded-xl"
            >
              누르면 바꿔줌
            </button>
          ) : (
            <div className="border border-gray-500 px-4 py-2 rounded-xl">
              지갑 연결하랑께
            </div>
          )}
        </div>
        <div>
          <div className="text-xl">이걸로 고백하면 성공함</div>
          <textarea
            className="mt-5 text-xl border-gray-400 border w-96 h-48 overflow-auto whitespace-pre-wrap"
            value={result}
            readOnly
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={`${process.env.PUBLIC_URL}/images/pepe.jpg`} />
      </div>
    </div>
  );
}

export default App;

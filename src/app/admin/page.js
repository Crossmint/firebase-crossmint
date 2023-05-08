"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/wallet?userId=${user.email}`);
      const jsonData = await res.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push("/");
    })
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="m-auto">
      <ul className="font-light py-10">
        <li className="flex space-x-1">
          <svg
            className="my-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 417"
          >
            <path
              fill="#343434"
              d="m127.961 0l-2.795 9.5v275.668l2.795 2.79l127.962-75.638z"
            />
            <path
              fill="#8C8C8C"
              d="M127.962 0L0 212.32l127.962 75.639V154.158z"
            />
            <path
              fill="#3C3C3B"
              d="m127.961 312.187l-1.575 1.92v98.199l1.575 4.601l128.038-180.32z"
            />
            <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" />
            <path
              fill="#141414"
              d="m127.961 287.958l127.96-75.637l-127.96-58.162z"
            />
            <path fill="#393939" d="m.001 212.321l127.96 75.637V154.159z" />
          </svg>
          <p className="my-auto">{data.ethereum.slice(0,4)}...{data.ethereum.slice(-4)} - <a href={`https://goerli.etherscan.io/address/${data.ethereum}`} target="_blank">view in Etherscan</a></p>
        </li>
        <li className="flex space-x-1">
          <svg
            className="my-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 128 128"
          >
            <path
              fill="#fff"
              d="M64 0c35.348 0 64 28.652 64 64s-28.652 64-64 64S0 99.348 0 64S28.652 0 64 0zm0 0"
            />
            <path
              fill="#7950DD"
              d="M85.898 49.242a5.76 5.76 0 0 0-5.418 0l-12.214 7.223l-8.532 4.742l-12.214 7.227a5.76 5.76 0 0 1-5.418 0l-9.707-5.649a5.423 5.423 0 0 1-2.711-4.52V46.989a4.972 4.972 0 0 1 2.71-4.52l9.708-5.417a5.738 5.738 0 0 1 5.418 0l9.707 5.418a5.423 5.423 0 0 1 2.71 4.52v7.218l8.329-4.965v-6.996a4.963 4.963 0 0 0-2.664-4.52l-17.86-10.382a5.738 5.738 0 0 0-5.418 0L24.266 37.727a4.608 4.608 0 0 0-2.934 4.52v20.991a4.967 4.967 0 0 0 2.711 4.496l18.059 10.407a5.76 5.76 0 0 0 5.418 0l12.214-7l8.352-4.965l12.172-6.977a5.76 5.76 0 0 1 5.418 0l9.707 5.418a5.419 5.419 0 0 1 2.707 4.52v11.062a4.967 4.967 0 0 1-2.707 4.516l-9.707 5.64a5.738 5.738 0 0 1-5.418 0l-9.707-5.418a5.416 5.416 0 0 1-2.711-4.515v-7.25l-8.106 4.738v7.219a4.969 4.969 0 0 0 2.707 4.52L80.5 100.03a5.746 5.746 0 0 0 5.422 0l18.058-10.383a5.42 5.42 0 0 0 2.688-4.511v-21a4.964 4.964 0 0 0-2.711-4.516zm0 0"
            />
          </svg>{" "}
          <p className="my-auto">{data.polygon.slice(0,4)}...{data.polygon.slice(-4)} - <a href={`https://mumbai.polygonscan.com/address/${data.polygon}`} target="_blank">view in Polygonscan</a></p>
        </li>
        <li className="flex space-x-1">
          <svg
            className="my-auto text-yellow-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m16.624 13.92l2.717 2.716l-7.353 7.353l-7.352-7.352l2.717-2.717l4.636 4.66l4.635-4.66zm4.637-4.636L24 12l-2.715 2.716L18.568 12l2.693-2.716zm-9.272 0l2.716 2.692l-2.717 2.717L9.272 12l2.716-2.715zm-9.273 0L5.41 12l-2.692 2.692L0 12l2.716-2.716zM11.99.01l7.352 7.33l-2.717 2.715l-4.636-4.636l-4.635 4.66l-2.717-2.716L11.989.011z"
            />
          </svg>{" "}
          <p className="my-auto">{data.bsc.slice(0,4)}...{data.bsc.slice(-4)} - <a href={`https://testnet.bscscan.com/address/${data.bsc}`} target="_blank">view in BscScan</a></p>
        </li>
        {data.solan}
        <li className="flex space-x-1">
          <svg
            className="my-auto text-purple-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 18h12l4-4H8zm4-4l-4-4h12l4 4m-4-4l4-4H8l-4 4"
            />
          </svg>{" "}
          <p className="my-auto">{data.solana.slice(0,4)}...{data.solana.slice(-4)} - <a href={`https://solscan.io/account/${data.solana}?cluster=devnet`} target="_blank">view in Solscan</a></p>
        </li>
        <li className="flex space-x-1">
          <svg
          className="my-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 237"
          >
            <path
              fill="#0033AD"
              d="M120.433 229.054a7.092 7.092 0 1 1 14.16.808a7.092 7.092 0 0 1-14.16-.808Zm-58.082-7.673a5.575 5.575 0 1 1 9.321 6.119a5.575 5.575 0 0 1-9.321-6.12Zm124.578-2.186a5.566 5.566 0 0 1 7.487 2.467a5.575 5.575 0 1 1-7.487-2.467Zm-111.114-27.32a8.608 8.608 0 0 1 11.914-2.488a8.617 8.617 0 0 1 2.486 11.923a8.608 8.608 0 0 1-14.4-9.435Zm93.625-3.176a8.599 8.599 0 0 1 11.574 3.767a8.617 8.617 0 1 1-11.817-3.639l.243-.128Zm-51.178-5.258a10.134 10.134 0 0 1 9.73-5.685c5.572.333 9.823 5.115 9.502 10.689a10.134 10.134 0 1 1-19.232-5.004Zm-89.63-15.687a7.092 7.092 0 1 1-.212.11l.211-.11Zm189.844 2.017a7.092 7.092 0 1 1 11.863 7.774a7.092 7.092 0 0 1-11.863-7.774ZM99.568 138.319a17.235 17.235 0 0 1 22.603 24.613a17.15 17.15 0 0 1-14.429 7.788a17.235 17.235 0 0 1-8.174-32.401Zm43.542-1.296a17.235 17.235 0 0 1 20.67 8.645c4.254 8.49.844 18.823-7.63 23.112a17.423 17.423 0 0 1-7.76 1.884a17.235 17.235 0 0 1-5.28-33.641Zm-82.993 9.57a10.134 10.134 0 1 1 12.242 15.66a10.134 10.134 0 0 1-12.242-15.66Zm119.749.78c3.071-4.679 9.354-5.982 14.032-2.91c4.67 3.078 5.97 9.352 2.91 14.033c-3.071 4.678-9.354 5.981-14.032 2.91c-4.679-3.072-5.982-9.354-2.91-14.033ZM70.099 117.396c.538-9.373 8.478-16.59 17.86-16.234c9.38.356 16.75 8.154 16.578 17.54c-.17 9.28-7.654 16.738-16.897 16.914l-.316.003h-.942c-9.411-.55-16.623-8.538-16.251-17.92l.015-.313l-.047.01Zm81.31-.194c.546-9.505 8.695-16.768 18.2-16.222a17.026 17.026 0 0 1 11.867 5.707A17.235 17.235 0 0 1 168.98 135.4l-.351.004h-.999c-9.505-.546-16.768-8.695-16.222-18.2Zm-122.317.784a8.608 8.608 0 0 1 9.08-8.106a8.617 8.617 0 0 1 8.108 9.088a8.608 8.608 0 0 1-17.188-.982Zm180.619-.39a8.608 8.608 0 0 1 17.188.977a8.617 8.617 0 0 1-9.088 8.109a8.608 8.608 0 0 1-8.1-9.085ZM5.669 113.009l.208.008a5.557 5.557 0 0 1 5.246 5.877a5.566 5.566 0 1 1-5.454-5.885Zm244.844-.575l.232.009a5.585 5.585 0 0 1 5.246 5.886a5.575 5.575 0 1 1-5.478-5.895ZM107.592 65.926A17.18 17.18 0 0 1 123 75.344a17.244 17.244 0 0 1-15.39 25.033a17.17 17.17 0 0 1-15.407-9.484a17.244 17.244 0 0 1 15.389-24.967Zm40.657-.122a17.235 17.235 0 1 1-14.438 7.788a17.254 17.254 0 0 1 14.438-7.788ZM59.174 78.057c3.069-4.68 9.35-5.987 14.03-2.918c4.68 3.068 5.987 9.35 2.92 14.03c-3.069 4.68-9.35 5.988-14.03 2.92a10.124 10.124 0 0 1-2.92-14.032Zm124.468-3.758a10.124 10.124 0 0 1 13.61 4.492c2.517 4.999.505 11.092-4.493 13.61c-4.999 2.517-11.092.505-13.61-4.493c-2.517-4.999-.505-11.092 4.493-13.61ZM25.655 59.013a7.092 7.092 0 1 1 11.862 7.777a7.092 7.092 0 0 1-11.862-7.777Zm195.312-2.87a7.092 7.092 0 0 1 6.384 12.665a7.101 7.101 0 0 1-9.531-3.146a7.092 7.092 0 0 1 3.147-9.52Zm-103.251-8.036c.32-5.585 5.108-9.854 10.694-9.536c5.585.318 9.856 5.103 9.54 10.69c-.315 5.585-5.098 9.858-10.684 9.545c-5.591-.319-9.866-5.108-9.55-10.699ZM78.792 32.48a8.608 8.608 0 1 1 7.747 15.375a8.608 8.608 0 0 1-7.747-15.375Zm86.956 2.762a8.617 8.617 0 1 1 2.505 11.933a8.608 8.608 0 0 1-2.505-11.933ZM63.996 7.42a5.575 5.575 0 0 1 5.057 9.937a5.585 5.585 0 0 1-7.534-2.467a5.575 5.575 0 0 1 2.477-7.47ZM184.31 9.06a5.575 5.575 0 1 1 9.334 6.101a5.575 5.575 0 0 1-9.334-6.1ZM125.404.4a7.092 7.092 0 1 1 4.681 13.388A7.092 7.092 0 0 1 125.404.4Z"
            />
          </svg>
          <p className="my-auto">{data.cardano.slice(0,4)}...{data.cardano.slice(-4)} - <a href={`https://preprod.cardanoscan.io/address/${data.cardano}`} target="_blank">view in Carnadoscan</a></p>
        </li>
      </ul>
      <a onClick={logOut} className="cursor-pointer bg-gray-100 rounded-lg p-2">Sign out</a>
      </div>
    </div>
  );
}

export default Page;

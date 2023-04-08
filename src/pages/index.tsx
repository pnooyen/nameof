import Image from "next/image";
import Head from 'next/head'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// import Header from "@/src/components/header";
// import Footer from "./components/footer";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Header from "@/components/header";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("cat");
  const [results, setResults] = useState([]);

  const genTheName = async (data: string) => {
    setType(data)
    setLoading(true);
    const res = fetch("/api/generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        type: data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        console.log(data);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Name0f</title>
        <meta name="description" content="Will gim you any names" />
      </Head>
      <div className="w-screen h-screen flex flex-col items-center">
        <Header />
        <main className="flex flex-col items-center w-[80%] md:w-[60%] xl:w-[50%] space-y-10">
          <h1 className="tracking-wide font-extrabold text-center text-text text-3xl sm:text-3xl md:text-3xl lg:text-3xl">
            I am the name giver EXPERT!!!!
            <br />
            Will give you the name of anything xD
          </h1>

          <button
            onClick={() => genTheName("Human")}
            disabled={loading}
            className="flex items-center justify-center border-2 border-text space-x-1 w-40 h-11 md:w-[300px] md:h-[45px] bg-primary rounded-lg transition duration-[400ms] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="md:text-lg font-semibold text-text">
              {loading ? "Loading..." : "Gimme HooMannn Names"}
            </h1>
          </button>

          <button
            onClick={() => genTheName("Cat")}
            disabled={loading}
            className="flex items-center justify-center border-2 border-text space-x-1 w-40 h-11 md:w-[300px] md:h-[45px] bg-primary rounded-lg transition duration-[400ms] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="md:text-lg font-semibold text-text">
              {loading ? "Loading..." : "Gimme Kitten names"}
            </h1>
          </button>

          <button
            onClick={() => genTheName("Dog")}
            disabled={loading}
            className="flex items-center justify-center border-2 border-text space-x-1 w-40 h-11 md:w-[300px] md:h-[45px] bg-primary rounded-lg transition duration-[400ms] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="md:text-lg font-semibold text-text">
              {loading ? "Loading..." : "Gimme Nong Hma names"}
            </h1>
          </button>

          <button
            onClick={() => genTheName("Car")}
            disabled={loading}
            className="flex items-center justify-center border-2 border-text space-x-1 w-40 h-11 md:w-[300px] md:h-[45px] bg-primary rounded-lg transition duration-[400ms] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="md:text-lg font-semibold text-text">
              {loading ? "Loading..." : "Gimme Car names"}
            </h1>
          </button>

          {results.length > 0 ? (
            <div
              className={`flex flex-col items-center w-[90%] sm:w-[70%] md:w-[95%] lg:w-[80%] space-y-8 mt-10 mb-10`}
            >
              <h1 className="tracking-wide font-extrabold text-center text-text text-2xl md:text-3xl lg:text-4xl">
                Wow, We just found the name0f {type}!!!
              </h1>

              <div className="">
                {results.map((row, index) => (
                  <div key={index} className="mt-2">
                    <div>{`GENDER: ${
                      row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
                    }`}</div>
                    <div>{`NAME: ${row.name}`}</div>
                    <div>{`PRONOUNCE: ${row.pronounce}`}</div>
                    <div>{`MEANS: ${row.meaning}`}</div>
                    {/* <span>{`GENDER: ${row.gender.charAt(0).toUpperCase() + row.gender.slice(1)} | NAME: ${row.name} | NAME: ${row.name} | PRONOUNCE: ${row.pronounce} | MEANS: ${row.meaning}`}</span> */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-24"></div>
          )}

          {/* <span>{JSON.stringify(results)}</span> */}
        </main>
      </div>
    </>
  );
}

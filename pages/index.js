import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Category from "./components/Category";

export default function Home() {
  const [movies, setmovies] = useState([]);
  const [value, setValues] = useState("");

  const handleEvent = (e) => {
    setValues(e.target.value);
  };

  const getMovies = async (value) => {
    const url = `http://www.omdbapi.com/?s=${value}&apikey=640f25a0`;

    const response = await fetch(url);

    const responseJson = await response.json();

    if (responseJson.Search) {
      setmovies(responseJson.Search);
    }
    console.log(value);
    console.log(setValues);
  };

  useEffect(() => {
    getMovies(value);
  }, [value]);

  return (
    <>
      <Head>
        <title>SlickMedia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Box bg="#292929" p="1rem">
          <Heading
            textAlign={{
              base: "center",
              lg: "left",
            }}
            border="1px"
            borderColor={"#fff"}
            color="#fff"
            display={{
              base: "block",
              lg: "inline",
            }}
            p={{
              base: "0",
              lg: ".5rem",
            }}
            fontSize="32px"
            fontWeight="thin"
          >
            MyTestApp
          </Heading>
        </Box>

        {/* IMAGE BOX */}
        <Box
          backgroundImage="/slickmedia.png"
          backgroundSize="cover"
          backgroundPosition="contain"
          backgroundRepeat="no-repeat"
          minH={{
            base: "40vh",
            lg: "80vh",
          }}
          p={{
            base: "4rem",
            lg: "3rem",
          }}
        >
          <Heading
            textAlign={{
              base: "center",
              lg: "left",
            }}
            color="#fff"
            fontSize={{
              base: "32px",
              lg: "72px",
            }}
            fontWeight="bold"
          >
            Watch <br /> something <br /> incredible.
          </Heading>
        </Box>

        {/* SEARCH BOX */}
        <Box bg="#f5f5f5" px="2rem">
          <Heading fontWeight="medium" fontSize="24px" p="1rem">
            Search
          </Heading>
          <Input
            type="text"
            placeholder="Search Movies"
            value={value}
            onChange={handleEvent}
          />
          <Flex
            flexWrap={"wrap"}
            justify="space-between"
            align="center"
            my="2rem"
            gap={{
              base: "30px",
              lg: "0",
            }}
          >
            {movies.map((movie, index) => (
              <Box key={index}>
                <Text>{movie.Title}</Text>
                <Image src={movie.Poster} alt="MovieImage" />
              </Box>
            ))}
          </Flex>

          <Category />
        </Box>
      </>
    </>
  );
}

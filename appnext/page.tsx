"use client";

import Image from "next/image";
import {
  Grid,
  GridItem,
  Icon,
  VStack,
  Container,
  Button,
  Text,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  Wrap,
  WrapItem,
  Center,
  Divider,
  Flex,
  IconButton,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { BiPaperPlane } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

export default function Home() {
  return (
    <Grid
      templateAreas={`"nav header"
                  "nav main"
                  "footer main"`}
      gridTemplateRows={"30px 1fr 0.4fr"}
      gridTemplateColumns={"0.15fr 1fr"}
      h="100vh"
      gap="0"
      color="shallow2dark"
    >
      <GridItem
        pl={2}
        bg="deep2dark"
        area={"header"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
      >
        Pointer
      </GridItem>
      <GridItem pl={3} pr={3} pt={1} bg="dark" area={"nav"}>
        <VStack spacing={3} align="stretch">
          <Input
            variant="unstyled"
            placeholder="Search note"
            size="sm"
            _placeholder={{ color: "inherit" }}
            backgroundColor="shallowdark"
            mt={2}
            p={1}
          />
          <Wrap>
            <WrapItem>
              <Center>
                <Button size="sm" variant="solid" colorScheme="blackAlpha">
                  Import
                </Button>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Button size="sm" variant="solid" colorScheme="blackAlpha">
                  Create
                </Button>
              </Center>
            </WrapItem>
          </Wrap>
          <VStack spacing={0} align="stretch">
            <Flex
              align="center"
              wrap="wrap"
              minWidth="max-content"
              pl={2}
              transition="background-color 0.3s"
              _hover={{ bgColor: "deepdark" }}
            >
              <Box>
                <Text fontSize="sm" noOfLines={1} maxWidth="150px">
                  112321dsfddsf1dsfddsf1dsfddsf4.md
                </Text>
              </Box>
              <Spacer />
              <ButtonGroup spacing={0} variant="outline" isAttached>
                <IconButton
                  backgroundColor="transparent"
                  borderColor="transparent"
                  aria-label="edit"
                  icon={<AiOutlineEdit color="#CCCCCF" />}
                  _hover={{ bgColor: "deep2dark" }}
                />
                <IconButton
                  backgroundColor="transparent"
                  borderColor="transparent"
                  aria-label="download"
                  icon={<BiDownload color="#CCCCCF" />}
                  _hover={{ bgColor: "deep2dark" }}
                />
                <IconButton
                  backgroundColor="transparent"
                  borderColor="transparent"
                  aria-label="share"
                  icon={<BiPaperPlane color="#CCCCCF" />}
                  _hover={{ bgColor: "deep2dark" }}
                />
                <IconButton
                  backgroundColor="transparent"
                  borderColor="transparent"
                  aria-label="delete"
                  icon={<AiOutlineDelete color="#CCCCCF" />}
                  _hover={{ bgColor: "deep2dark" }}
                />
              </ButtonGroup>
            </Flex>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem pl={2} bg="deepdark" area={"main"}>
        Main
      </GridItem>
      <GridItem pl={2} bg="deep2dark" area={"footer"}>
        <Heading mt={4} mb={1.5} ml={1.5} size="sm">
          About
        </Heading>
        <Text fontSize="sm" m={1.5}>
          Pointer is a browser-based, self-hosted, fully open source mini
          Markdown notebook, written in Rust and TypeScript.
        </Text>
        <Text fontSize="sm" m={1.5}>
          Users can create new or import local Markdown files. One file can be
          edited by one user or by multiple users in real time when it's in a
          shared state.
        </Text>
        <Text fontSize="sm" m={1.5}>
          Inspired by Gist and Jupyter Notebook, users can edit, compile, and
          run inline code snippets written in multiple programming languages in
          the note.
        </Text>
        <Button
          leftIcon={<BsGithub />}
          variant="solid"
          size="sm"
          colorScheme="blackAlpha"
          m={1.5}
        >
          <a href="https://github.com/dx-han/pointer" target="_blank">
            Visit the Github repository
          </a>
        </Button>
      </GridItem>
    </Grid>
  );
}
